/**
 * Script to download face-api.js models
 * Run with: npx tsx scripts/download-models.ts
 */

import * as fsSync from "fs";
import * as fs from "fs/promises";
import * as path from "path";
import https from "https";

const MODEL_FILES = [
  // SSD MobileNet V1 - Face detector
  "ssd_mobilenetv1_model-weights_manifest.json",
  "ssd_mobilenetv1_model.weights.bin",
  
  // Face Landmarks 68 - Facial landmarks detection
  "face_landmark_68_model-weights_manifest.json",
  "face_landmark_68_model.bin",
  
  // Face Recognition - Face descriptor extraction
  "face_recognition_model-weights_manifest.json",
  "face_recognition_model.weights.bin",
];

const MODEL_BASE_URL = "https://github.com/justadudewhohacks/face-api.js/raw/master/weights";

const MODELS_DIR = path.resolve(process.cwd(), "models");

async function downloadFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fsSync.createWriteStream(destPath);
    
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          https.get(redirectUrl, (redirectResponse) => {
            redirectResponse.pipe(file);
            file.on("finish", () => {
              file.close();
              resolve();
            });
          }).on("error", (err) => {
            fsSync.unlink(destPath, () => {});
            reject(err);
          });
          return;
        }
      }
      
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve();
      });
    }).on("error", (err) => {
      fsSync.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log("Downloading face-api.js models...");
  
  // Create models directory if it doesn't exist
  await fs.mkdir(MODELS_DIR, { recursive: true });
  
  for (const modelFile of MODEL_FILES) {
    const url = `${MODEL_BASE_URL}/${modelFile}`;
    const destPath = path.join(MODELS_DIR, modelFile);
    
    console.log(`Downloading ${modelFile}...`);
    
    try {
      await downloadFile(url, destPath);
      console.log(`✓ Downloaded ${modelFile}`);
    } catch (error) {
      console.error(`✗ Failed to download ${modelFile}:`, error);
      process.exit(1);
    }
  }
  
  console.log("\n✅ All models downloaded successfully!");
  console.log(`Models saved to: ${MODELS_DIR}`);
}

main().catch(console.error);
