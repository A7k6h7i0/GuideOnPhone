"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/forms/Input";
import { Checkbox } from "@/components/forms/Checkbox";
import { Button } from "@/components/ui/Button";
import { WebcamCapture } from "@/components/forms/WebcamCapture";
import { apiClient } from "@/lib/apiClient";
import { getApiErrorMessage } from "@/lib/error";
import type { Agent } from "@/types/models";

type VerificationResult = {
  status: "PENDING_VERIFICATION" | "APPROVED" | "REJECTED";
  message: string;
};

type VerificationStep = 
  | "step1" 
  | "step2"  
  | "step3"  
  | "step4"  
  | "step5"  
  | "step6";

export default function AgentProfilePage() {
  const [currentStep, setCurrentStep] = useState<VerificationStep>("step1");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingStep1, setSavingStep1] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [uploadingSelfie, setUploadingSelfie] = useState(false);
  const [verifyingFace, setVerifyingFace] = useState(false);
  const [verifyingGst, setVerifyingGst] = useState(false);
  const [completing, setCompleting] = useState(false);

  const [city, setCity] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [availableHours, setAvailableHours] = useState("9:00-18:00");
  const [guideFee, setGuideFee] = useState("1000");
  const [cabBooking, setCabBooking] = useState(false);
  const [hotelBooking, setHotelBooking] = useState(false);
  const [languages, setLanguages] = useState("English, Hindi");

  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [aadhaarMasked, setAadhaarMasked] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [otp, setOtp] = useState("");

  const [selfiePreview, setSelfiePreview] = useState("");
  const [selfieImageBase64, setSelfieImageBase64] = useState("");
  const [gst1, setGst1] = useState("");
  const [gst2, setGst2] = useState("");

  const [profile, setProfile] = useState<Agent | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpCountdown, setOtpCountdown] = useState(0);

  const loadProfile = async () => {
    try {
      const { data } = await apiClient.get<Agent>("/agent/dashboard/me");
      setProfile(data);
      setCity(data.city ?? "");
      setStateValue(data.state ?? "");
      setAvailableHours(data.availableHours ?? "");
      setGuideFee(String(data.guideFee ?? data.feePerTrip ?? 0));
      setCabBooking(Boolean(data.cabBooking));
      setHotelBooking(Boolean(data.hotelBooking));
      setLanguages((data.languages ?? []).join(", "));
      setAadhaarMasked(data.aadhaarMasked ?? "");
      setGst1(data.gstReferences?.[0] ?? "");
      setGst2(data.gstReferences?.[1] ?? "");
      
      if (data.status === "APPROVED") {
        setCurrentStep("step6");
      } else if (data.gstVerified) {
        setCurrentStep("step6");
      } else if (data.faceVerified) {
        setCurrentStep("step5");
      } else if (data.selfieImage) {
        setCurrentStep("step4");
      } else if (data.aadhaarVerified) {
        setCurrentStep("step3");
      }
    } catch {
      setProfile(null);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    void loadProfile();
  }, []);

  useEffect(() => {
    if (otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown(otpCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpCountdown]);

  const stepCompletion = useMemo(() => {
    return {
      step1: Boolean(profile && profile.city && profile.state && profile.languages?.length && profile.guideFee > 0),
      step2: Boolean(profile?.aadhaarVerified),
      step3: Boolean(profile?.selfieImage || selfieImageBase64),
      step4: Boolean(profile?.faceVerified),
      step5: Boolean(profile?.gstVerified),
      step6: Boolean(profile?.status === "APPROVED" || profile?.status === "REJECTED" || result)
    };
  }, [profile, result, selfieImageBase64]);

  const saveStep1 = async () => {
    setError("");
    setSuccess("");
    const parsedFee = Number(guideFee);
    const parsedLanguages = languages.split(",").map(v => v.trim()).filter(Boolean);

    if (city.trim().length < 2 || stateValue.trim().length < 2) {
      setError("City and State must each be at least 2 characters.");
      return;
    }
    if (!Number.isFinite(parsedFee) || parsedFee <= 0) {
      setError("Guide Fee must be a positive number.");
      return;
    }
    if (parsedLanguages.length === 0) {
      setError("Please add at least one language.");
      return;
    }

    setSavingStep1(true);
    try {
      await apiClient.put("/agent/dashboard/me", {
        city: city.trim(),
        state: stateValue.trim(),
        availableHours: availableHours.trim(),
        guideFee: parsedFee,
        cabBooking,
        hotelBooking,
        languages: parsedLanguages
      });
      await loadProfile();
      setSuccess("Registration details saved! Continue to Aadhaar verification.");
      setCurrentStep("step2");
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to save registration details."));
    } finally {
      setSavingStep1(false);
    }
  };

  const sendOtp = async () => {
    setError("");
    setSuccess("");
    const normalizedAadhaar = aadhaarNumber.replace(/[^\d]/g, "");
    if (!/^\d{12}$/.test(normalizedAadhaar)) {
      setError("Aadhaar number must be exactly 12 digits.");
      return;
    }

    setSendingOtp(true);
    try {
      const { data } = await apiClient.post("/agent/aadhaar/send-otp", { aadhaarNumber: normalizedAadhaar });
      setSessionId(data.sessionId);
      setAadhaarMasked(data.aadhaarMasked);
      setSuccess("OTP sent to your Aadhaar-linked mobile number.");
      setOtpCountdown(60);
      await loadProfile();
    } catch (err) {
      setError(getApiErrorMessage(err, "Failed to send Aadhaar OTP."));
    } finally {
      setSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    setError("");
    setSuccess("");
    if (!sessionId) {
      setError("Please request OTP first.");
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setVerifyingOtp(true);
    try {
      await apiClient.post("/agent/aadhaar/verify-otp", { otp: otp.trim(), sessionId });
      setSuccess("Aadhaar verified successfully! Now capture your selfie.");
      setOtp("");
      await loadProfile();
      setCurrentStep("step3");
    } catch (err) {
      setError(getApiErrorMessage(err, "OTP verification failed."));
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleSelfieCapture = (imageBase64: string) => {
    setSelfieImageBase64(imageBase64);
    setSelfiePreview(imageBase64);
  };

  const uploadSelfie = async () => {
    setError("");
    setSuccess("");
    if (!selfieImageBase64) {
      setError("Please capture your selfie first using the camera.");
      return;
    }

    setUploadingSelfie(true);
    try {
      await apiClient.post("/agent/upload-selfie", { imageBase64: selfieImageBase64 });
      setSuccess("Selfie uploaded! Running face verification...");
      await loadProfile();
      await runFaceVerify();
    } catch (err) {
      setError(getApiErrorMessage(err, "Selfie upload failed."));
    } finally {
      setUploadingSelfie(false);
    }
  };

  const runFaceVerify = async () => {
    setError("");
    setSuccess("");
    setVerifyingFace(true);
    try {
      const { data } = await apiClient.post("/agent/face-verify", {});
      
      if (data.faceVerified) {
        setSuccess(`Face verified! Similarity score: ${data.similarityScore}%. Continue to GST verification.`);
        await loadProfile();
        setCurrentStep("step5");
      } else {
        setError(`Face verification failed. Score: ${data.similarityScore}%. Please try again.`);
        await loadProfile();
      }
    } catch (err) {
      const errMsg = getApiErrorMessage(err, "Face verification failed.");
      setError(errMsg);
      await loadProfile();
    } finally {
      setVerifyingFace(false);
    }
  };

  const verifyGst = async () => {
    setError("");
    setSuccess("");
    const gstRef1 = gst1.trim().toUpperCase();
    const gstRef2 = gst2.trim().toUpperCase();
    
    if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[A-Z]{1}\d{1}$/.test(gstRef1) || 
        !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[A-Z]{1}\d{1}$/.test(gstRef2)) {
      setError("Please enter valid 15-character GST numbers.");
      return;
    }
    if (gstRef1 === gstRef2) {
      setError("Both GST references must be different.");
      return;
    }

    setVerifyingGst(true);
    try {
      await apiClient.post("/agent/gst-verify", { gstReferences: [gstRef1, gstRef2] });
      setSuccess("GST references validated! Complete verification to get approved.");
      await loadProfile();
    } catch (err) {
      setError(getApiErrorMessage(err, "GST verification failed."));
    } finally {
      setVerifyingGst(false);
    }
  };

  const completeVerification = async () => {
    setError("");
    setSuccess("");
    setCompleting(true);
    try {
      const { data } = await apiClient.post<VerificationResult>("/agent/complete-verification", {});
      setResult(data);
      if (data.status === "APPROVED") {
        setSuccess("Congratulations! You have been approved automatically!");
      } else {
        setError("Verification rejected: " + data.message);
      }
      await loadProfile();
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to complete verification."));
    } finally {
      setCompleting(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-slate-600">Loading verification status...</p>
        </div>
      </div>
    );
  }

  if (profile?.status === "APPROVED") {
    return (
      <div className="space-y-6 rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mb-4 text-6xl">🎉</div>
        <h1 className="text-3xl font-bold text-green-800">Congratulations!</h1>
        <p className="text-lg text-green-700">Your agent profile has been automatically approved!</p>
        <div className="mt-6 rounded-lg bg-white p-4 text-left">
          <h3 className="font-semibold text-slate-800">Your Profile:</h3>
          <div className="mt-2 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>City:</strong> {profile.city}, {profile.state}</p>
            <p><strong>Languages:</strong> {profile.languages?.join(", ")}</p>
            <p><strong>Fee:</strong> ₹{profile.guideFee}/trip</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-semibold">Automated Agent Verification</h1>
        <p className="mt-1 text-slate-600">Complete all steps to get approved automatically.</p>
        
        <div className="mt-6 flex items-center justify-between">
          {(["step1", "step2", "step3", "step4", "step5", "step6"] as VerificationStep[]).map((step, index) => (
            <div key={step} className="flex flex-1 items-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${stepCompletion[step] ? "bg-green-500 text-white" : currentStep === step ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                {stepCompletion[step] ? "✓" : index + 1}
              </div>
              {index < 5 && <div className={`h-1 flex-1 ${stepCompletion[step] ? "bg-green-500" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1 */}
      <section className={`rounded-2xl border p-6 ${currentStep === "step1" ? "border-blue-300 bg-white" : "border-slate-200 bg-slate-50 opacity-60"}`}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Step 1: Registration Details</h2>
          {stepCompletion.step1 && <span className="text-green-500">✓ Complete</span>}
        </div>
        {currentStep === "step1" && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input placeholder="City *" value={city} onChange={e => setCity(e.target.value)} />
              <Input placeholder="State *" value={stateValue} onChange={e => setStateValue(e.target.value)} />
            </div>
            <Input placeholder="Available Hours" value={availableHours} onChange={e => setAvailableHours(e.target.value)} />
            <Input placeholder="Guide Fee per trip (₹) *" type="number" value={guideFee} onChange={e => setGuideFee(e.target.value)} />
            <Input placeholder="Languages (comma separated) *" value={languages} onChange={e => setLanguages(e.target.value)} />
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={cabBooking} onChange={e => setCabBooking(e.target.checked)} /> Cab Booking
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox checked={hotelBooking} onChange={e => setHotelBooking(e.target.checked)} /> Hotel Booking
              </label>
            </div>
            <Button onClick={saveStep1} disabled={savingStep1}>{savingStep1 ? "Saving..." : "Save & Continue"}</Button>
          </div>
        )}
      </section>

      {/* Step 2 */}
      <section className={`rounded-2xl border p-6 ${currentStep === "step2" ? "border-blue-300 bg-white" : "border-slate-200 bg-slate-50 opacity-60"}`}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Step 2: Aadhaar OTP Verification</h2>
          {stepCompletion.step2 && <span className="text-green-500">✓ Verified</span>}
        </div>
        {currentStep === "step2" && !stepCompletion.step2 && (
          <div className="space-y-4">
            <div className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">OTP will be sent to your Aadhaar-linked mobile number.</div>
            <Input placeholder="Enter 12-digit Aadhaar Number" value={aadhaarNumber} onChange={e => setAadhaarNumber(e.target.value.replace(/\D/g, "").slice(0, 12))} maxLength={12} />
            <Button onClick={sendOtp} disabled={sendingOtp || otpCountdown > 0}>
              {sendingOtp ? "Sending..." : otpCountdown > 0 ? `Resend in ${otpCountdown}s` : "Send OTP to Aadhaar"}
            </Button>
            {aadhaarMasked && <p className="text-sm text-slate-600">Aadhaar: {aadhaarMasked}</p>}
            <div className="flex gap-4">
              <Input placeholder="Enter 6-digit OTP" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} maxLength={6} className="w-40" />
              <Button onClick={verifyOtp} disabled={verifyingOtp || !otp}>{verifyingOtp ? "Verifying..." : "Verify OTP"}</Button>
            </div>
          </div>
        )}
        {stepCompletion.step2 && currentStep !== "step2" && <p className="text-green-600">✓ Aadhaar verified ({aadhaarMasked || profile?.aadhaarMasked})</p>}
      </section>

      {/* Step 3 */}
      <section className={`rounded-2xl border p-6 ${currentStep === "step3" ? "border-blue-300 bg-white" : "border-slate-200 bg-slate-50 opacity-60"}`}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Step 3: Live Selfie Capture</h2>
          {stepCompletion.step3 && <span className="text-green-500">✓ Captured</span>}
        </div>
        {currentStep === "step3" && !stepCompletion.step3 && (
          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">Use your camera to capture a live selfie.</div>
            <WebcamCapture onCapture={handleSelfieCapture} capturedImage={selfiePreview} />
            <Button onClick={uploadSelfie} disabled={uploadingSelfie || !selfieImageBase64} className="w-full">
              {uploadingSelfie ? "Uploading & Verifying..." : "Upload Selfie & Run Face Verification"}
            </Button>
          </div>
        )}
      </section>

      {/* Step 4 */}
      <section className={`rounded-2xl border p-6 ${currentStep === "step4" ? "border-blue-300 bg-white" : "border-slate-200 bg-slate-50 opacity-60"}`}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Step 4: Face Match AI</h2>
          {stepCompletion.step4 && <span className="text-green-500">✓ Verified</span>}
        </div>
        {currentStep === "step4" && !stepCompletion.step4 && (
          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">AI will compare your selfie with Aadhaar photo. Minimum 90% required.</div>
            {verifyingFace ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                  <p>Running face verification...</p>
                </div>
              </div>
            ) : (
              <Button onClick={runFaceVerify} disabled={!stepCompletion.step3}>Run Face Verification</Button>
            )}
          </div>
        )}
        {stepCompletion.step4 && <p className="text-green-600">✓ Face verified ({profile?.faceSimilarityScore}% similarity)</p>}
      </section>

      {/* Step 5 */}
      <section className={`rounded-2xl border p-6 ${currentStep === "step5" ? "border-blue-300 bg-white" : "border-slate-200 bg-slate-50 opacity-60"}`}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Step 5: GST References</h2>
          {stepCompletion.step5 && <span className="text-green-500">✓ Verified</span>}
        </div>
        {currentStep === "step5" && !stepCompletion.step5 && (
          <div className="space-y-4">
            <div className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800">Submit two different GST numbers for verification.</div>
            <Input placeholder="GST Reference 1" value={gst1} onChange={e => setGst1(e.target.value.toUpperCase())} maxLength={15} />
            <Input placeholder="GST Reference 2" value={gst2} onChange={e => setGst2(e.target.value.toUpperCase())} maxLength={15} />
            <Button onClick={verifyGst} disabled={verifyingGst || !gst1 || !gst2}>{verifyingGst ? "Verifying GST..." : "Verify GST References"}</Button>
          </div>
        )}
        {stepCompletion.step5 && <p className="text-green-600">✓ GST verified ({profile?.gstReferences?.join(", ")})</p>}
      </section>

      {/* Step 6 */}
      <section className={`rounded-2xl border p-6 ${currentStep === "step6" ? "border-blue-300 bg-white" : "border-slate-200 bg-slate-50 opacity-60"}`}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Step 6: Complete Verification</h2>
          {stepCompletion.step6 && <span className="text-green-500">✓ Done</span>}
        </div>
        {currentStep === "step6" && !stepCompletion.step6 && (
          <div className="space-y-4">
            <div className="rounded-lg bg-purple-50 p-3 text-sm text-purple-800">Click below to complete automated verification.</div>
            <div className="rounded-lg bg-slate-100 p-4">
              <h3 className="font-semibold">Verification Summary:</h3>
              <div className="mt-2 space-y-1 text-sm">
                <p className={stepCompletion.step2 ? "text-green-600" : "text-red-500"}>• Aadhaar OTP: {stepCompletion.step2 ? "✓" : "✗"}</p>
                <p className={stepCompletion.step4 ? "text-green-600" : "text-red-500"}>• Face Match: {stepCompletion.step4 ? "✓" : "✗"}</p>
                <p className={stepCompletion.step5 ? "text-green-600" : "text-red-500"}>• GST: {stepCompletion.step5 ? "✓" : "✗"}</p>
              </div>
            </div>
            <Button onClick={completeVerification} disabled={completing || !stepCompletion.step5} className="w-full">
              {completing ? "Processing..." : "Complete Automated Verification"}
            </Button>
          </div>
        )}
        {stepCompletion.step6 && result?.status === "APPROVED" && (
          <div className="rounded-lg bg-green-50 p-4 text-center">
            <div className="mb-2 text-4xl">🎉</div>
            <p className="font-semibold text-green-800">Congratulations! You're approved!</p>
          </div>
        )}
        {stepCompletion.step6 && profile?.status === "REJECTED" && (
          <div className="rounded-lg bg-red-50 p-4">
            <p className="font-semibold text-red-800">Verification Rejected</p>
            <p className="text-sm text-red-600">{profile.rejectionReason}</p>
          </div>
        )}
      </section>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 p-4"><p className="font-medium text-red-800">Error</p><p className="text-sm text-red-600">{error}</p></div>}
      {success && <div className="rounded-lg border border-green-200 bg-green-50 p-4"><p className="font-medium text-green-800">Success</p><p className="text-sm text-green-600">{success}</p></div>}
    </div>
  );
}

