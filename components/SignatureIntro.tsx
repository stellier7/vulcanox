"use client";

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ProgressBar } from './ProgressBar';

gsap.registerPlugin(ScrollTrigger);

export function SignatureIntro() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIso(() => {
    const el = sectionRef.current;
    const h = headlineRef.current;
    const overlay = overlayRef.current;
    if (!el || !h || !overlay) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add(
        {
          isDesktop: '(min-width: 768px)'
        },
        (ctx) => {
          const isDesktop = ctx.conditions?.isDesktop;
          if (isDesktop) {
            const lift = 140;
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: el,
                start: 'top top',
                end: `+=${lift + 60}`,
                scrub: true,
                pin: true,
                anticipatePin: 1
              }
            });
            // slide in from left to center
            tl.fromTo(h, { x: -120, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' })
              // lift upward to align with next card height
              .to(h, { y: -lift, ease: 'none' }, 0)
              // fade blackout to reveal next section near the end
              .to(overlay, { opacity: 0, ease: 'none' }, 0.7);
          } else {
            // Mobile: no pin; simple scrubbed slide + small lift
            const lift = 60;
            gsap.fromTo(
              h,
              { x: -80, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  end: 'top 50%',
                  scrub: true
                }
              }
            );
            gsap.to(h, {
              y: -lift,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom top', scrub: true }
            });
            gsap.to(overlay, {
              opacity: 0,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top 70%', end: 'bottom top', scrub: true }
            });
          }
        }
      );
    }, el);

    return () => {
      ctx.revert();
      mm.kill();
    };
  }, []);

  return (
    <section ref={sectionRef as any} className="relative w-full h-[70svh] md:h-[85svh]">
      {/* Blackout layer over video */}
      <div ref={overlayRef} className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 flex items-center">
        <div className="container-edge w-full">
          <motion.h2
            ref={headlineRef}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="font-serif text-2xl md:text-4xl lg:text-5xl max-w-5xl text-center md:text-left"
          >
            We transform properties into high-performing investments.
          </motion.h2>
        </div>
      </div>
      <ProgressBar forRef={sectionRef as any} />
    </section>
  );
}


