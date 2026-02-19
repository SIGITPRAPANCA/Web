"use client";
import { useState, useRef, useEffect } from 'react';
import DomeGallery from '@/components/DomeGallery';
import InteractionFlow from '@/components/InteractionFlow';

export default function Home() {
  const [showGallery, setShowGallery] = useState(false);
  const audioRef = useRef(null);

  const userImages = [
    '/1.jpg','/2.jpg','/3.jpg','/4.jpg','/5.jpg',
    '/6.jpg','/7.jpg','/8.jpg','/9.jpg','/10.jpg',
    '/11.jpg','/12.jpg','/13.jpg','/14.jpg','/15.jpg',
  ];

  useEffect(() => {
    if (showGallery && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [showGallery]);

  return (
    <main className="w-screen h-screen bg-[#060010]">
      
      <audio ref={audioRef} src="/season.mp3" loop />

      {!showGallery ? (
        <InteractionFlow onFlowComplete={() => setShowGallery(true)} />
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
}            minRadius={600}
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
