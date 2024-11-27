"use client";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}
export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="w-full py-3 mt-6 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-800 font-medium">
      {pending ? "로딩 중..." : text}
    </button>
  );
}
