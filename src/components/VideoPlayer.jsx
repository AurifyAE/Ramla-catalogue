// src/components/VideoPlayer.jsx
import { useRef, useState, useEffect } from "react";

function VideoPlayer({ videoSrc }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setUserPaused(false);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setUserPaused(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  // Handle video ended event
  const handleVideoEnded = () => {
    if (!userPaused) {
      // If user hasn't manually paused, restart the video
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.error("Error playing video:", err));
      }
    } else {
      setIsPlaying(false);
    }
  };

  // Initialize video playback
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, []);

  return (
    <div className="relative w-full max-w-4xl max-sm:w-[80%] mx-auto mt-16 mb-10">
      {/* Video without native controls */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="rounded-[20px] w-full"
        onClick={togglePlayPause}
        onEnded={handleVideoEnded}
      />

      {/* Minimal custom controls */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-4 items-center">
        {/* Mute/Unmute button */}
        <button
          onClick={toggleMute}
          className="bg-[#EAD4B4]/70 hover:bg-[#EAD4B4]/60 rounded-full p-2 transition"
        >
          {isMuted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="black"
              viewBox="0 0 24 24"
            >
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="black"
              viewBox="0 0 24 24"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>

        {/* Play/Pause button */}
        {/* <button
          onClick={togglePlayPause}
          className="bg-[#EAD4B4]/70 hover:bg-[#EAD4B4]/60 rounded-full p-2 transition"
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="black"
              viewBox="0 0 24 24"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="black"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button> */}
      </div>

      {/* Center play button (shown only when paused) */}
      {!isPlaying && (
        <div
          onClick={togglePlayPause}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#EAD4B4]/80 rounded-full p-4 cursor-pointer transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="black"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}

      {/* Custom overlay text */}
      {/* <div className="absolute bottom-16 left-0 right-0 text-center text-white text-xl">
        <p className="font-light">
          Discover the custom-made luxury bespoke menswear in Dubai
        </p>
      </div> */}
    </div>
  );
}

export default VideoPlayer;