"use client";

import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/site.config';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type HeroProps = {
  onScrollToProjects?: () => void;
  onScrollToContact?: () => void;
};

export function Hero({ onScrollToProjects, onScrollToContact }: HeroProps) {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReduced(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  const isVideo = siteConfig.heroMedia === 'video' && !prefersReduced;

  // Ensure native autoplay/loop (simple and smooth). No custom frame scrubbing.
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const vid = videoRef.current;
    const onReady = async () => {
      try {
        vid.loop = true;
        vid.muted = true;
        vid.playbackRate = 1.0;
        await vid.play().catch(() => {});
      } catch {}
    };
    if (vid.readyState >= 2) onReady();
    else vid.addEventListener('canplay', onReady, { once: true });
    return () => {};
  }, [isVideo]);

  return (
    <section className="relative h-[100svh] w-full overflow-x-clip">
      {/* Fixed background layer */}
      {isVideo ? (
        <video
          ref={videoRef}
          className="fixed inset-0 -z-10 h-full w-full object-cover pointer-events-none"
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          poster="/images/projects/hero-fallback.jpeg"
        >
          <source src="/media/hero-boomerang.mp4" type="video/mp4" />
        </video>
      ) : (
        <div className="fixed inset-0 -z-10">
          <Image
            src="/images/projects/hero-fallback.jpeg"
            alt="VULCANOX background"
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* Global dim over media */}
      <div className="fixed inset-0 -z-10 bg-black/50" />
      {/* Removed extra bottom fade; container below uses solid background */}

      {/* Hero content */}
      <div className="relative h-full container-edge flex flex-col items-start justify-center gap-6 overflow-x-clip">
        <motion.h1
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: -56 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReduced ? 0.35 : 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl md:text-5xl lg:text-6xl max-w-4xl leading-[1.06] tracking-[-0.01em]"
        >
          <span className="block font-light text-white/78">We Don’t Build Properties.</span>
          <span className="mt-1 block italic text-white md:mt-2">
            We Build <span className="not-italic text-bronze">Assets.</span>
          </span>
        </motion.h1>
        <motion.p
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReduced ? 0.35 : 0.85, delay: prefersReduced ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl text-xs uppercase tracking-[0.24em] text-white/55 md:text-sm md:tracking-[0.28em]"
        >
          Florida Investment-Driven General Contracting.
        </motion.p>
        <motion.div
          initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0.35 : 0.8, delay: prefersReduced ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-4"
        >
          <button
            onClick={onScrollToContact}
            aria-label="Talk to Us"
            className="rounded-full bg-bronze px-6 py-3 text-sm font-medium text-black hover:brightness-110 transition"
          >
            Talk to Us
          </button>
          <button
            onClick={onScrollToProjects}
            aria-label="View Projects"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-medium hover:bg-white/10 transition"
          >
            View Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
}


