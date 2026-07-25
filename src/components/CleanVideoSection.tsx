"use client";

import { useRef, useState, useCallback } from "react";
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize } from "react-icons/fi";

interface CleanVideoSectionProps {
  videoSrc: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  aspectRatio?: "video" | "wide" | "square";
  autoPlay?: boolean;
}

export default function CleanVideoSection({
  videoSrc,
  title,
  subtitle,
  badge,
  autoPlay = true,
}: CleanVideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen();
    }
  }, []);

  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle || badge) && (
          <div className="mb-8 text-center max-w-3xl mx-auto">
            {badge && (
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary-light mb-4">
                🎬 {badge}
              </span>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Clean Video Container */}
        <div
          ref={containerRef}
          className="group relative overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900 shadow-2xl shadow-slate-950/50 transition-all duration-300 hover:border-primary/40"
        >
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay={autoPlay}
            muted={isMuted}
            loop
            playsInline
            className="w-full h-auto max-h-[650px] object-cover rounded-2xl"
          />

          {/* Minimal Controls Bar */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-slate-950/85 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-full shadow-lg opacity-90 transition-opacity group-hover:opacity-100">
            <button
              onClick={togglePlay}
              className="flex items-center justify-center p-1.5 text-slate-300 hover:text-white transition-colors"
              aria-label={isPlaying ? "Pause video" : "Play video"}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <FiPause size={18} /> : <FiPlay size={18} />}
            </button>

            <button
              onClick={toggleMute}
              className="flex items-center justify-center p-1.5 text-slate-300 hover:text-white transition-colors"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
            </button>

            <button
              onClick={toggleFullscreen}
              className="flex items-center justify-center p-1.5 text-slate-300 hover:text-white transition-colors border-l border-slate-800 pl-2"
              aria-label="Fullscreen"
              title="Fullscreen"
            >
              <FiMaximize size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
