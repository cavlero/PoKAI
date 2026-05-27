import { useState, useRef } from "react";
import { UploadCloud, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export interface DocumentMetadata {
  title: string;
  author: string;
  year: string;
  distributor: string;
  notes: string;
}

interface UploadZoneProps {
  onAnalyze: (imageUrl: string, file: File, metadata: DocumentMetadata) => void;
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors";

export function UploadZone({ onAnalyze }: UploadZoneProps) {
  const [dragActive,    setDragActive]    = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile,  setSelectedFile]  = useState<File | null>(null);
  const [meta, setMeta] = useState<DocumentMetadata>({
    title: "", author: "", year: "", distributor: "", notes: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setSelectedImage(URL.createObjectURL(file));
    setSelectedFile(file);
    setMeta((m) => ({ ...m, title: file.name.replace(/\.[^.]+$/, "") }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  const reset = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    setMeta({ title: "", author: "", year: "", distributor: "", notes: "" });
  };

  const set = (key: keyof DocumentMetadata) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setMeta((m) => ({ ...m, [key]: e.target.value }));

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!selectedImage ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
                Upload a Heritage Document
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                Drop or select a scan — fill in the book details and the AI will OCR,
                translate, and index it immediately.
              </p>
            </div>

            <div
              className={`relative flex flex-col items-center justify-center p-14 border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer ${
                dragActive
                  ? "border-primary bg-primary/10 scale-[1.01]"
                  : "border-white/15 hover:border-primary/50 hover:bg-white/[0.03]"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              data-testid="upload-dropzone"
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                onChange={(e) => { e.preventDefault(); if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
                className="hidden"
                data-testid="input-file-upload"
              />
              <motion.div
                animate={dragActive ? { scale: 1.15 } : { scale: 1 }}
                className="bg-primary/10 border border-primary/30 p-5 rounded-full mb-5"
              >
                <UploadCloud className="w-10 h-10 text-primary" />
              </motion.div>
              <p className="text-lg font-medium text-foreground mb-1">
                {dragActive ? "Release to upload" : "Drag and drop your scan here"}
              </p>
              <p className="text-sm text-muted-foreground">or click to browse files</p>
              <p className="text-xs text-muted-foreground/40 mt-4">PNG, JPG, WEBP, HEIC</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-6"
          >
            {/* Preview */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={selectedImage}
                alt="Selected scan"
                className="w-full max-h-64 object-contain bg-black/40"
                data-testid="img-upload-preview"
              />
              <button
                onClick={reset}
                className="absolute top-3 right-3 flex items-center gap-1.5 bg-background/80 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 text-xs text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-change-image"
              >
                <RefreshCw className="w-3 h-3" />
                Change
              </button>
              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-background/80 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 max-w-[80%]">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-xs text-muted-foreground truncate">{selectedFile?.name}</span>
              </div>
            </div>

            {/* Metadata form */}
            <div className="rounded-2xl border border-white/10 bg-card/40 backdrop-blur-sm px-6 py-5 flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary/60">
                Book details
              </p>

              {/* Title + Author side by side on wide screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Title" required>
                  <input
                    type="text"
                    value={meta.title}
                    onChange={set("title")}
                    placeholder="e.g. Svishtov High School Records"
                    className={inputCls}
                    data-testid="input-title"
                  />
                </Field>
                <Field label="Author">
                  <input
                    type="text"
                    value={meta.author}
                    onChange={set("author")}
                    placeholder="e.g. Ivan Petrov"
                    className={inputCls}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Year">
                  <input
                    type="text"
                    value={meta.year}
                    onChange={set("year")}
                    placeholder="e.g. 1902"
                    className={inputCls}
                  />
                </Field>
                <Field label="Distributor / Publisher">
                  <input
                    type="text"
                    value={meta.distributor}
                    onChange={set("distributor")}
                    placeholder="e.g. Danube Press"
                    className={inputCls}
                  />
                </Field>
              </div>

              <Field label="Notes">
                <textarea
                  value={meta.notes}
                  onChange={set("notes")}
                  placeholder="Page numbers, condition, context…"
                  rows={2}
                  className={`${inputCls} resize-none`}
                />
              </Field>

              <p className="text-xs text-muted-foreground/40">
                Multiple scans of the same book can share the same title and author — each page will be indexed separately.
              </p>
            </div>

            <Button
              size="lg"
              className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-serif rounded-xl shadow-[0_0_30px_rgba(201,162,39,0.25)] hover:shadow-[0_0_40px_rgba(201,162,39,0.4)] transition-all"
              disabled={!meta.title.trim()}
              onClick={() => selectedFile && onAnalyze(selectedImage!, selectedFile, meta)}
              data-testid="button-analyze"
            >
              <Search className="w-5 h-5 mr-2" />
              Analyse &amp; Index Document
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
