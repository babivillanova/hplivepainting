'use client'
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const videos = [
  {
    src: "/frame--d0.mp4",
    alt: "frame",
    style: { transform: 'scaleY(1.1)', maxHeight: '100vh' }
  },
  
  {
    src: "/1.mp4",
    alt: "frame",
    style: { transform: 'scaleY(1.1)', maxHeight: '100vh' }
  },
  {
    src: "/2.mp4",
    alt: "frame",
    style: { transform: 'scaleY(1.1)', maxHeight: '100vh' }
  },
  {
    src: "/3.mp4",
    alt: "frame",
    style: { transform: 'scaleY(1.1)', maxHeight: '100vh' }
  },
  {
    src: "/4.mp4",
    alt: "frame",
    style: { transform: 'scaleY(1.1)', maxHeight: '100vh' }
  },
  {
    src: "/5.mp4",
    alt: "frame",
    style: { transform: 'scaleY(1.1)', maxHeight: '100vh' }
  },
  {
    src: "/6.mp4",
    alt: "frame",
    style: { transform: 'scaleY(1.1)', maxHeight: '100vh' }
  }
]

export default function Home() {
  const [showVideo, setShowVideo] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoSrc, setVideoSrc] = useState(videos[0].src);
  const videoRef = useRef(null);

  // Add effect to handle video source changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [videoSrc]);

  useEffect(() => {
    let timeoutId;
    
    if (!showVideo) {
      timeoutId = setTimeout(() => {
        setShowVideo(true);
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 1000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [showVideo]);

  // Update video source when showVideo changes
  useEffect(() => {
    if (showVideo) {
      console.log('Setting video source to:', videos[currentIndex].src);
      setVideoSrc(videos[currentIndex].src);
      
      // Set random index for next video
      setTimeout(() => {
        setCurrentIndex(() => {
          // Generate random index excluding current index
          let nextIndex;
          do {
            nextIndex = Math.floor(Math.random() * videos.length);
          } while (nextIndex === currentIndex);
          
          console.log('Setting random index to:', nextIndex);
          return nextIndex;
        });
      }, 1000);
    }
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
            {/* Static frame */}
            <img src="/frame-initial.jpg" alt="frame" className="absolute inset-0 w-[98%] h-full object-cover transition-opacity duration-500" />
           
            {/* Playing video */}
            <video
              key={videoSrc}
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`absolute inset-0 w-[98%] h-full object-cover transition-opacity duration-500 ${showVideo ? 'opacity-100' : 'opacity-0'}`}
              onEnded={handleVideoEnd}
              style={{ pointerEvents: 'none' }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
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
