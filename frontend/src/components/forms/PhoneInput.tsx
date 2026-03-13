import type { InputHTMLAttributes } from "react";
import { Input } from "./Input";

export const PhoneInput = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <Input {...props} placeholder={props.placeholder ?? "+91 9876543210"} />
);
