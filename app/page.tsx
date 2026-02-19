"use client";
import { useState, useRef } from "react";
import DomeGallery from "@/components/DomeGallery";

export default function Home() {
  const [started, setStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const userImages = [
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
    "/6.jpg",
    "/7.jpg",
    "/8.jpg",
    "/9.jpg",
    "/10.jpg",
    "/11.jpg",
    "/12.jpg",
    "/13.jpg",
    "/14.jpg",
    "/15.jpg",
  ];

  const startApp = () => {
    setStarted(true);
    audioRef.current?.play();
  };

  return (
    <main className="w-screen h-screen bg-black flex items-center justify-center">
      {!started ? (
        <button
          onClick={startApp}
          className="px-6 py-3 bg-pink-500 text-white rounded-xl text-lg"
        >
          Tap to Start ❤️
        </button>
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
}  return (
    <main className="w-screen h-screen bg-[#060010] relative overflow-hidden">
      <audio ref={audioRef} src="/season.mp3" loop />

      {!showGallery ? (
        <InteractionFlow onFlowComplete={handleFlowComplete} />
      ) : (
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
      )}
    </main>
  );
}
