'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [showVideo, setShowVideo] = useState(true);
  const videoRef = useRef(null);
  const firstFrameRef = useRef(null);

  useEffect(() => {
    let timeoutId;
    
    if (!showVideo) {
      timeoutId = setTimeout(() => {
        setShowVideo(true);
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 10000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showVideo]);

  const handleVideoEnd = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setShowVideo(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="w-full relative max-h-screen">
        {/* Container that maintains aspect ratio */}
        <div className="relative " style={{ paddingTop: '66.67%' }}>
          {/* Video layer */}
          <div className="absolute inset-0 flex items-center justify-center ml-5">
            {/* Playing video */}
            <video
              ref={firstFrameRef}
              muted
              playsInline
              className={`absolute inset-0 w-[98%] h-full object-cover transition-opacity duration-500 `}
              style={{ pointerEvents: 'none' }}
            >
              <source src="/frame--d0.mp4" type="video/mp4" />
            </video>
           
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`absolute inset-0 w-[98%] h-full object-cover transition-opacity duration-500 ${showVideo ? 'opacity-100' : 'opacity-0'}`}
              onEnded={handleVideoEnd}
              style={{ pointerEvents: 'none' }}
            >
              <source src="/frame--d0.mp4" type="video/mp4" />
            </video>
            
            {/* First frame video */}
      
          </div>
          
          {/* Frame overlay */}
          <div className="absolute inset-0" style={{ zIndex: 2 }}>
            <Image
              src="/frame2.png"
              alt="frame"
              fill
              className=""
              priority
              style={{transform: 'scaleY(1.1)', maxHeight: '100vh'}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
