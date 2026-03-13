import type { InputHTMLAttributes } from "react";
import { Input } from "./Input";

export const OTPInput = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <Input {...props} maxLength={6} placeholder="123456" />
);
