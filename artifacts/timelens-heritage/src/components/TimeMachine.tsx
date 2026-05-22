import { useState, useRef, useEffect } from "react";
import { Monument } from "@/data/monuments";

interface TimeMachineProps {
  monument: Monument;
  currentImage: string;
}

export function TimeMachine({ monument, currentImage }: TimeMachineProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("mouseup", () => setIsDragging(false));
      window.addEventListener("touchend", () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseup", () => setIsDragging(false));
      window.removeEventListener("touchend", () => setIsDragging(false));
    };
  }, [isDragging]);

  return (
    <div className="w-full max-w-5xl mx-auto my-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif text-primary mb-3">Temporal Reconstruction</h2>
        <p className="text-muted-foreground">Drag the slider to compare the monument's current state with its historical appearance.</p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border-2 border-white/10 shadow-2xl"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        {/* Present (Underneath) */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={currentImage} 
            alt="Present day" 
            className="w-full h-full object-cover filter contrast-125 saturate-110" 
          />
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur px-3 py-1 rounded text-sm text-foreground/80">
            Present Day
          </div>
        </div>

        {/* Past (On top, clipped) */}
        <div 
          className="absolute inset-0 w-full h-full border-r-2 border-primary"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          {/* We'll use a simulated historical image using CSS filters on the same image or a generic historical gradient if we don't have one. Since we don't have real past images, we'll heavily stylize the current image to look like an old painting/sepia reconstruction, and add a text overlay */}
          <div className="w-full h-full relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#8a6d3b] via-[#d4af37] to-[#f4e094] mix-blend-color" />
            <div className="absolute inset-0 bg-black/40" />
            <img 
              src={currentImage} 
              alt="Historical reconstruction" 
              className="w-full h-full object-cover sepia-[0.8] contrast-125 brightness-90 hue-rotate-90" 
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <p className="text-white text-center px-8 font-serif text-lg md:text-2xl drop-shadow-md">
                {monument.pastImageDescription}
              </p>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-primary/80 backdrop-blur px-3 py-1 rounded text-sm text-primary-foreground font-medium">
            Historical Reconstruction
          </div>
        </div>

        {/* Slider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize flex items-center justify-center z-10"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg border-2 border-primary-foreground">
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-primary-foreground/80 rounded-full" />
              <div className="w-1 h-3 bg-primary-foreground/80 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
