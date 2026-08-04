"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { FiUpload } from "react-icons/fi";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentImage?: string | null;
  label?: string;
}

export default function ImageUpload({
  onUpload,
  currentImage,
  label = "Image",
}: ImageUploadProps) {
  const { showToast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      const url = data.url;
      setPreview(url);
      onUpload(url);
      showToast({ type: "success", message: "Image uploaded successfully" });
    } catch {
      showToast({ type: "error", message: "Failed to upload image" });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      {preview && (
        <div className="relative h-40 w-40 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          <Image
            src={preview}
            alt={`${label} preview`}
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload-input"
        />
        <label
          htmlFor="image-upload-input"
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-3 py-1.5 text-sm font-medium rounded-lg border-2 border-amber-600 text-amber-600 hover:bg-amber-50 active:bg-amber-100 transition-colors cursor-pointer"
        >
          {uploading ? (
            <svg
              className="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <FiUpload size={16} />
          )}
          {preview ? "Change Image" : "Upload Image"}
        </label>
      </div>
    </div>
  );
}
