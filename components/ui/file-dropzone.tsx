"use client";

import React, { useCallback, useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileDropzoneProps {
  onFiles?: (files: File[]) => void;
  accept?: string;
  maxSizeMb?: number;
  className?: string;
}

export function FileDropzone({ onFiles, accept, maxSizeMb = 10, className }: FileDropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files?.length) return;
      const list = Array.from(files).filter((file) => file.size <= maxSizeMb * 1024 * 1024);
      if (list.length > 0) {
        setFileName(list[0].name);
        onFiles?.(list);
      }
    },
    [maxSizeMb, onFiles]
  );

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors",
        dragging ? "border-primary bg-primary/5" : "border-border bg-card/30 hover:border-primary/40",
        className
      )}
    >
      <input type="file" className="hidden" accept={accept} onChange={(e) => handleFiles(e.target.files)} />
      <div className="mb-3 flex size-12 items-center justify-center rounded-xl border border-border bg-card/60">
        <Upload className="size-5 text-primary" />
      </div>
      <p className="font-medium">{fileName ? fileName : "Drop files here or click to upload"}</p>
      <p className="mt-1 text-sm text-muted-foreground">Up to {maxSizeMb}MB per file</p>
    </label>
  );
}
