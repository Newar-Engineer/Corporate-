"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export interface HeroVideoItem {
  src: string;
  title: string;
  badge?: string;
}

const DEFAULT_VIDEOS: HeroVideoItem[] = [
  {
    src: "/videos/web animation.mp4",
    title: "Web Animation Showcase",
    badge: "Interactive Animations",
  },
  {
    src: "/videos/web desing.mp4",
    title: "Modern Web Design",
    badge: "Creative Design",
  },
  {
    src: "/videos/webdes.mp4",
    title: "Digital Product Engineering",
    badge: "Full-Stack Solutions",
  },
  {
    src: "/videos/websss.mp4",
    title: "High Performance Web Apps",
    badge: "Speed & SEO Optimized",
  },
];

interface HeroVideoProps {
  videos?: HeroVideoItem[];
  fallbackImage?: string;
  headline?: string;
  subtitle?: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
}

export default function HeroVideo({
  videos = DEFAULT_VIDEOS,
  fallbackImage,
  headline = "Building Nepal's Digital Future —",
  subtitle = "Newa Enterprises delivers trusted trading, consultancy, logistics, and digital solutions from Baneshwor, Kathmandu to clients across Nepal.",
  primaryCta = { text: "Explore Services", href: "/services" },
  secondaryCta = { text: "Watch Showcase", href: "/portfolio" },
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  const currentVideo = videos[currentIndex] || videos[0];

  useEffect(() => {
    if ("connection" in navigator) {
      const conn = (navigator as any).connection;
      if (conn) {
        setIsLowPower(conn.effectiveType === "slow-2g" || conn.effectiveType === "2g");
        const handler = () => {
          setIsLowPower(conn.effectiveType === "slow-2g" || conn.effectiveType === "2g");
        };
        conn.addEventListener("change", handler);
        return () => conn.removeEventListener("change", handler);
      }
    }
  }, []);

  // When changing video index, attempt auto play if isPlaying is true
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Auto-play was prevented or interrupted
        });
      }
    }
  }, [currentIndex, isPlaying]);

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

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, [videos.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  const showVideo = !videoFailed && !isLowPower;

  return (
    <section className="relative w-full h-screen max-h-[900px] min-h-[600px] overflow-hidden" aria-labelledby="hero-headline">
      {showVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          playsInline
          preload="auto"
          onEnded={handleNext}
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          poster={fallbackImage || "/images/hero-poster.jpg"}
          key={currentVideo.src}
        >
          <source src={currentVideo.src} type="video/mp4" />
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

      {/* Dark overlay gradients for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-transparent" aria-hidden="true" />

      {/* Main Hero Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary-light backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                Trusted partner in Baneshwor, Kathmandu
              </span>
              {currentVideo.badge && (
                <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  🎬 {currentVideo.badge}
                </span>
              )}
            </div>

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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2">
        <span className="text-xs text-slate-400 font-medium tracking-widest uppercase">Scroll</span>
        <FiChevronDown className="text-slate-400 animate-scroll" size={20} />
      </div>

      {/* Video Navigation & Controls Bar */}
      {showVideo && (
        <div className="absolute bottom-6 right-4 sm:right-8 z-20 flex flex-wrap items-center gap-3 bg-slate-950/75 backdrop-blur-md border border-slate-800 p-2 sm:p-2.5 rounded-2xl shadow-2xl">
          {/* Previous / Next buttons */}
          <div className="flex items-center gap-1 border-r border-slate-800 pr-2">
            <button
              onClick={handlePrev}
              className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Previous video"
              title="Previous video"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Next video"
              title="Next video"
            >
              <FiChevronRight size={18} />
            </button>
          </div>

          {/* Dots / Video Switcher Indicators */}
          <div className="flex items-center gap-1.5 px-1">
            {videos.map((vid, idx) => (
              <button
                key={vid.src}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-7 h-2.5 bg-gradient-to-r from-primary to-accent"
                    : "w-2.5 h-2.5 bg-slate-600 hover:bg-slate-400"
                }`}
                aria-label={`Go to video ${idx + 1}: ${vid.title}`}
                title={`${idx + 1}. ${vid.title}`}
              />
            ))}
          </div>

          <span className="text-xs text-slate-400 font-mono px-1 border-l border-slate-800">
            {currentIndex + 1}/{videos.length}
          </span>

          {/* Play/Pause & Mute/Unmute */}
          <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
            <button
              onClick={togglePlay}
              className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              aria-label={isPlaying ? "Pause video" : "Play video"}
              title={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
            </button>
            <button
              onClick={toggleMute}
              className="min-h-[36px] min-w-[36px] flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              title={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <FiVolumeX size={16} /> : <FiVolume2 size={16} />}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}