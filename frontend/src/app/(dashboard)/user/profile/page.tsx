"use client";

import { useState } from "react";
import { Input } from "@/components/forms/Input";
import { Button } from "@/components/ui/Button";
import { apiClient } from "@/lib/apiClient";

export default function UserProfilePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const onSave = async () => {
    await apiClient.patch("/users/me", { name, phone });
    alert("Profile updated");
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Button onClick={onSave}>Save</Button>
    </div>
  );
}
