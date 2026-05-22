import { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadZoneProps {
  onAnalyze: (imageUrl: string) => void;
}

export function UploadZone({ onAnalyze }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-card/80 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-primary mb-2">Upload a Monument</h2>
        <p className="text-muted-foreground">Upload a photo of a historical landmark to begin the temporal analysis.</p>
      </div>

      {!selectedImage ? (
        <div
          className={`relative flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out cursor-pointer ${
            dragActive ? "border-primary bg-primary/10 scale-[1.02]" : "border-white/20 hover:border-primary/50 hover:bg-white/5"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          <div className="bg-background/50 p-4 rounded-full mb-4 ring-1 ring-white/10">
            <UploadCloud className="w-10 h-10 text-primary" />
          </div>
          <p className="text-lg font-medium text-foreground mb-2">Drag and drop your image</p>
          <p className="text-sm text-muted-foreground">or click to browse files</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-6 border border-white/10 shadow-lg">
            <img src={selectedImage} alt="Selected monument" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => setSelectedImage(null)}
                className="bg-background/80 hover:bg-background text-foreground border border-white/20 backdrop-blur-md"
              >
                Change Image
              </Button>
            </div>
          </div>
          <Button 
            size="lg" 
            className="w-full text-lg h-14 bg-primary text-primary-foreground hover:bg-primary/90 font-serif"
            onClick={() => onAnalyze(selectedImage)}
          >
            Initiate Temporal Analysis
          </Button>
        </div>
      )}
    </div>
  );
}
