"use client";

import { useState } from "react";

export const useToast = () => {
  const [message, setMessage] = useState<string | null>(null);

  const showToast = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(null), 2500);
  };

  return { message, showToast };
};
