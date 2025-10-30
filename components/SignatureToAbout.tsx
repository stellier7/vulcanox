"use client";

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export function SignatureToAbout() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsoLayoutEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const panels = Array.from(track.children) as HTMLElement[];
    const totalWidth = panels.reduce((acc, el) => acc + el.clientWidth, 0);
    const viewportWidth = container.clientWidth;
    const scrollDistance = Math.max(0, totalWidth - viewportWidth);

    const ctx = gsap.context(() => {
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
      <div ref={trackRef} className="flex">
        {/* Panel 1: Signature */}
        <div className="shrink-0 w-screen h-[100svh] flex items-center">
          <div className="container-edge">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="font-serif text-2xl md:text-4xl lg:text-5xl max-w-5xl"
            >
              We transform properties into high-performing investments.
            </motion.h2>
          </div>
        </div>

        {/* Panel 2: About Headline */}
        <div className="shrink-0 w-screen h-[100svh] flex items-center">
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


