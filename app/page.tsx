"use client";

import { useState, useRef } from "react";
import InteractionFlow from "@/components/InteractionFlow";
import DomeGallery from "@/components/DomeGallery";

export default function Home() {
  const [showGallery, setShowGallery] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const userImages = [
    "/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg",
    "/6.jpg", "/7.jpg", "/8.jpg", "/9.jpg", "/10.jpg",
    "/11.jpg", "/12.jpg", "/13.jpg", "/14.jpg", "/15.jpg",
  ];

  const handleEnterGallery = () => {
    setShowGallery(true);

    setTimeout(() => {
      audioRef.current?.play().catch(() => {});
    }, 100);
  };

  return (
    <main className="w-screen h-screen bg-[#060010] overflow-hidden">
      {!showGallery ? (
        <InteractionFlow onEnterGallery={handleEnterGallery} />
      ) : (
        <>
          <audio ref={audioRef} src="/season.mp3" loop />

          <DomeGallery
            images={userImages}
            fit={0.8}
            minRadius={600}
            maxVerticalRotationDeg={0}
            segments={34}
            dragDampening={2}
            grayscale={false}
            autoRotationSpeed={0.1}
          />
        </>
      )}
    </main>
  );
}
