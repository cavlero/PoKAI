import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-5xl mx-auto my-16"
    >
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs uppercase tracking-widest mb-4">
          Time Machine
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-primary mb-3">See the Past</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Move the slider to compare the monument today and its historical appearance.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl"
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
            className="w-full h-full object-cover brightness-105 contrast-110 saturate-105"
          />
          <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur px-3 py-1.5 rounded-full text-xs text-foreground/80 font-medium tracking-wide border border-white/10">
            Today
          </div>
        </div>

        {/* Past (On top, clipped) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <div className="w-full h-full relative">
            <img
              src={currentImage}
              alt="Historical reconstruction"
              className="w-full h-full object-cover sepia brightness-75 contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#3d2b1f]/60 via-[#7a5c35]/40 to-[#c9a227]/20" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
              <p className="text-white/90 text-center px-8 font-serif text-base md:text-xl drop-shadow-lg leading-relaxed max-w-md">
                {monument.pastImageDescription}
              </p>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 bg-primary/80 backdrop-blur px-3 py-1.5 rounded-full text-xs text-primary-foreground font-medium tracking-wide border border-primary/30">
            {monument.period}
          </div>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary/90 z-10 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        />

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 flex items-center justify-center z-20"
          style={{ left: `calc(${sliderPosition}% - 20px)` }}
        >
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(201,162,39,0.5)] border-2 border-primary-foreground/20 cursor-ew-resize">
            <div className="flex gap-1">
              <div className="w-0.5 h-4 bg-primary-foreground/70 rounded-full" />
              <div className="w-0.5 h-4 bg-primary-foreground/70 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground/60 mt-4 tracking-wider uppercase">
        Drag slider to travel through time
      </p>
    </motion.div>
  );
}
