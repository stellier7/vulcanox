"use client";

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ProgressBar } from './ProgressBar';

gsap.registerPlugin(ScrollTrigger);

export function AboutIntro() {
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
            const lift = 160;
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: el,
                start: 'top top',
                end: `+=${lift + 120}`,
                scrub: true,
                pin: true,
                anticipatePin: 1
              }
            });
            tl.fromTo(h, { x: 120, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' })
              .to(h, { y: -lift, ease: 'none' }, 0)
              .to(overlay, { opacity: 0, ease: 'none' }, 0.3);
          } else {
            const lift = 80;
            gsap.fromTo(
              h,
              { x: 80, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                scrollTrigger: {
                  trigger: el,
                  start: 'top 85%',
                  end: 'top 40%',
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
    <section ref={sectionRef as any} className="relative w-full h-[70svh] md:h-[90svh] hidden md:block">
      <div ref={overlayRef} className="absolute inset-0 bg-charcoal" />
      <div className="absolute inset-0 flex items-center">
        <div className="container-edge w-full">
          <motion.h3
            ref={headlineRef}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl md:text-5xl text-center md:text-left"
          >
            Leadership Shapes Results.
          </motion.h3>
        </div>
      </div>
      <ProgressBar forRef={sectionRef as any} />
    </section>
  );
}


