"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiChevronDown } from "react-icons/fi";

interface HeroVideoProps {
  videoSrc?: string;
  fallbackImage?: string;
  headline?: string;
  subtitle?: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
}

export default function HeroVideo({
  videoSrc = "/videos/web animation.mp4",
  fallbackImage,
  headline = "Building Nepal's Digital Future —",
  subtitle = "Newa Enterprises delivers trusted trading, consultancy, logistics, and digital solutions from Baneshwor, Kathmandu to clients across Nepal.",
  primaryCta = { text: "Explore Services", href: "/services" },
  secondaryCta = { text: "Watch Showcase", href: "/portfolio" },
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);

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

  return (
    <section className="relative w-full h-screen max-h-[900px] min-h-[600px] overflow-hidden" aria-labelledby="hero-headline">
      {!videoFailed ? (
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
          poster={fallbackImage || "/images/hero-poster.jpg"}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${fallbackImage || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"})`,
          }}
          aria-hidden="true"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 to-transparent" aria-hidden="true" />

      <div className="absolute inset-0 flex items-center">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary-light mb-6">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Trusted partner in Baneshwor, Kathmandu
            </p>
            <h1
              id="hero-headline"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-4"
            >
              <span className="gradient-text">{headline}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-8">
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={primaryCta.href}
                className="min-h-[48px] inline-flex items-center px-6 sm:px-8 rounded-xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent-dark transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40 animate-glow"
              >
                {primaryCta.text}
              </Link>
              <Link
                href={secondaryCta.href}
                className="min-h-[48px] inline-flex items-center gap-2 px-6 sm:px-8 rounded-xl text-sm sm:text-base font-semibold text-slate-200 border border-slate-700 hover:border-primary/50 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <FiPlay size={16} />
                {secondaryCta.text}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-slate-500 font-medium tracking-widest uppercase">Scroll</span>
        <FiChevronDown className="text-slate-400 animate-scroll" size={20} />
      </div>

      {!videoFailed && (
        <div className="absolute bottom-8 right-4 sm:right-8 z-10 flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full glass-light text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
          </button>
          <button
            onClick={toggleMute}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full glass-light text-slate-300 hover:text-white hover:bg-white/10 transition-all"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
          </button>
        </div>
      )}
    </section>
  );
}