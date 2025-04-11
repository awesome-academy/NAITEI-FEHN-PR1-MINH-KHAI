"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export interface LabeledInputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  showToggle?: boolean;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  className = "",
  showToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <Input
          id={id}
          name={name}
          type={showToggle && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full border-gray-300 rounded ${className}`}
        />
        {showToggle && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default LabeledInput;
