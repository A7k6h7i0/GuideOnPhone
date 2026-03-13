import * as faceapi from "@vladmandic/face-api";
import * as fs from "fs/promises";
import * as path from "path";
import { logger } from "../config/logger.js";

// Path to store the AI models
const MODELS_PATH = path.resolve(process.cwd(), "models");

// Singleton to track if models are loaded
let modelsLoaded = false;

/**
 * Initialize and load face-api models
 * Should be called once at application startup
 */
export const loadFaceApiModels = async (): Promise<void> => {
  if (modelsLoaded) {
    logger.info("Face API models already loaded");
    return;
  }

  try {
    // Check if models directory exists
    await fs.access(MODELS_PATH);

    logger.info("Loading Face API models...");

    // Load required models for face detection and recognition
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODELS_PATH);
    await faceapi.nets.faceLandmark68Net.loadFromDisk(MODELS_PATH);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(MODELS_PATH);

    modelsLoaded = true;
    logger.info("Face API models loaded successfully");
  } catch (error) {
    logger.error("Failed to load Face API models:", { error });
    throw new Error(
      " found. Please runFace API models not the download-models script."
    );
  }
};

/**
 * Compare two face images and return similarity score
 * @param selfiePath - Path to the user's selfie image
 * @param referencePath - Path to the reference image (Aadhaar photo)
 * @returns Similarity score (0-100) or -1 if detection fails
 */
export const compareFaces = async (
  selfiePath: string,
  referencePath: string
): Promise<number> => {
  if (!modelsLoaded) {
    await loadFaceApiModels();
  }

  try {
    // Read and load images
    const [selfieBuffer, referenceBuffer] = await Promise.all([
      fs.readFile(selfiePath),
      fs.readFile(referencePath),
    ]);

    // Create HTMLImageElement-like objects from buffers
    const selfieImage = await faceapi.bufferToImage(new Blob([selfieBuffer]));
    const referenceImage = await faceapi.bufferToImage(new Blob([referenceBuffer]));

    // Detect faces with landmarks and descriptors
    const selfieDetections = await faceapi
      .detectAllFaces(selfieImage)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const referenceDetections = await faceapi
      .detectAllFaces(referenceImage)
      .withFaceLandmarks()
      .withFaceDescriptors();

    // Clean up image objects
    selfieImage.remove();
    referenceImage.remove();

    // Check if faces were detected in both images
    if (!selfieDetections.length) {
      logger.warn("No face detected in selfie image");
      return -1;
    }

    if (!referenceDetections.length) {
      logger.warn("No face detected in reference image (Aadhaar)");
      return -1;
    }

    // Use the first detected face from each image
    const selfieDescriptor = selfieDetections[0].descriptor;
    const referenceDescriptor = referenceDetections[0].descriptor;

    // Calculate Euclidean distance between face descriptors
    const distance = faceapi.euclideanDistance(
      selfieDescriptor,
      referenceDescriptor
    );

    // Convert distance to similarity score (0-100)
    // face-api uses a threshold of ~0.6 for high confidence match
    // Lower distance = higher similarity
    const maxDistance = 0.8; // Maximum reasonable distance
    const similarityScore = Math.max(
      0,
      Math.min(100, ((maxDistance - distance) / maxDistance) * 100)
    );

    logger.info(
      `Face comparison completed. Distance: ${distance.toFixed(
        4
      )}, Similarity: ${similarityScore.toFixed(1)}%`
    );

    return similarityScore;
  } catch (error) {
    logger.error("Face comparison error:", { error });
    return -1;
  }
};

/**
 * Verify if a face exists in an image
 * @param imagePath - Path to the image
 * @returns true if a face is detected, false otherwise
 */
export const detectFace = async (imagePath: string): Promise<boolean> => {
  if (!modelsLoaded) {
    await loadFaceApiModels();
  }

  try {
    const imageBuffer = await fs.readFile(imagePath);
    const image = await faceapi.bufferToImage(new Blob([imageBuffer]));

    const detections = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks();

    image.remove();

    return detections.length > 0;
  } catch (error) {
    logger.error("Face detection error:", { error });
    return false;
  }
};

/**
 * Get face landmarks for additional verification
 * @param imagePath - Path to the image
 * @returns Face landmarks or null if no face detected
 */
export const getFaceLandmarks = async (
  imagePath: string
): Promise<faceapi.FaceLandmarks68 | null> => {
  if (!modelsLoaded) {
    await loadFaceApiModels();
  }

  try {
    const imageBuffer = await fs.readFile(imagePath);
    const image = await faceapi.bufferToImage(new Blob([imageBuffer]));

    const detections = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks();

    image.remove();

    if (detections.length > 0) {
      return detections[0].landmarks;
    }

    return null;
  } catch (error) {
    logger.error("Face landmarks error:", { error });
    return null;
  }
};


