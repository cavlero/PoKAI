import { useState, useRef } from "react";
import { UploadCloud, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";

interface UploadZoneProps {
  onAnalyze: (imageUrl: string, fileName: string) => void;
}

export function UploadZone({ onAnalyze }: UploadZoneProps) {
  const { t } = useLang();
  const [dragActive,     setDragActive]     = useState(false);
  const [selectedImage,  setSelectedImage]  = useState<string | null>(null);
  const [fileName,       setFileName]       = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setSelectedImage(url);
    setFileName(file.name);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-widest mb-4">
          <Search className="w-3.5 h-3.5" />
          {t("upload_badge")}
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-3">
          {t("upload_title")}
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          {t("upload_subtitle")}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!selectedImage ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`relative flex flex-col items-center justify-center p-14 border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer ${
              dragActive
                ? "border-primary bg-primary/10 scale-[1.01]"
                : "border-white/15 hover:border-primary/50 hover:bg-white/3"
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
              accept="image/*"
              onChange={handleChange}
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
              {dragActive ? t("upload_release") : t("upload_drag")}
            </p>
            <p className="text-sm text-muted-foreground">{t("upload_browse")}</p>
            <p className="text-xs text-muted-foreground/40 mt-4">{t("upload_formats")}</p>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-5"
          >
            {/* Image preview */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={selectedImage}
                alt={t("upload_alt")}
                className="w-full h-full object-cover"
                data-testid="img-upload-preview"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              {/* File name tag */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-background/80 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 max-w-[80%]">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-xs text-muted-foreground truncate">{fileName}</span>
              </div>
              {/* Change image */}
              <button
                onClick={() => { setSelectedImage(null); setFileName(""); }}
                className="absolute top-3 right-3 flex items-center gap-1.5 bg-background/80 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 text-xs text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-change-image"
              >
                <RefreshCw className="w-3 h-3" />
                {t("upload_change")}
              </button>
            </div>

            {/* Analyze button */}
            <Button
              size="lg"
              className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-serif rounded-xl shadow-[0_0_30px_rgba(201,162,39,0.25)] hover:shadow-[0_0_40px_rgba(201,162,39,0.4)] transition-all"
              onClick={() => onAnalyze(selectedImage, fileName)}
              data-testid="button-analyze"
            >
              <Search className="w-5 h-5 mr-2" />
              {t("upload_analyze")}
            </Button>

            <p className="text-xs text-muted-foreground/40 text-center">
              {t("upload_note")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
