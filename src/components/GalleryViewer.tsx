"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

interface GalleryImage {
  url: string;
  caption: string;
}

interface GalleryViewerProps {
  images: GalleryImage[];
}

const gradientBg = [
  "from-indigo-600/30 via-purple-600/20 to-slate-900",
  "from-cyan-600/30 via-blue-600/20 to-slate-900",
  "from-emerald-600/30 via-teal-600/20 to-slate-900",
];

export default function GalleryViewer({ images }: GalleryViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const current = images[activeIndex];

  const prev = () => setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <button
          onClick={() => setLightboxOpen(true)}
          className="group relative block w-full overflow-hidden rounded-2xl border border-slate-700/50 aspect-video"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${gradientBg[activeIndex % gradientBg.length]} transition-all duration-700`}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-2 text-4xl opacity-30">🖼</div>
              <p className="text-sm text-slate-400">{current.caption}</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
              Click to expand
            </span>
          </div>
        </button>

        {/* Thumbnails */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative shrink-0 h-16 w-24 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                i === activeIndex
                  ? "border-primary opacity-100"
                  : "border-slate-700/30 opacity-60 hover:opacity-90"
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradientBg[i % gradientBg.length]}`}
              />
              {i === activeIndex && (
                <span className="absolute inset-0 border-2 border-primary/30 rounded-lg" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          >
            <FiX size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
          >
            <FiChevronRight size={24} />
          </button>
          <div
            className="relative max-w-4xl w-full aspect-video rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradientBg[activeIndex % gradientBg.length]}`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-white/70 text-lg">{images[activeIndex].caption}</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <p className="text-sm text-white/80">
                {activeIndex + 1} / {images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
