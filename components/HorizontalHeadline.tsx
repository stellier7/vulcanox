"use client";

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export function HorizontalHeadline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsoLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth;
      const viewportWidth = container.clientWidth;
      const scrollDistance = Math.max(0, totalWidth - viewportWidth);

      gsap.to(track, {
        x: () => -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-charcoal">
      {/* Track is 200vw: empty panel then headline panel coming from right */}
      <div ref={trackRef} className="flex">
        <div className="shrink-0 w-screen h-[80svh] md:h-[100svh]" />
        <div className="shrink-0 w-screen h-[80svh] md:h-[100svh] flex items-center">
          <div className="container-edge w-full">
            <motion.h3
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl md:text-5xl text-center"
            >
              Leadership Shapes Results.
            </motion.h3>
          </div>
        </div>
      </div>
    </section>
  );
}


