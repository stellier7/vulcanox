"use client";

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export function NextSignatureSlide() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  useIso(() => {
    const el = sectionRef.current;
    const h = headlineRef.current;
    if (!el || !h) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add({ isDesktop: '(min-width: 768px)' }, (ctx) => {
        if (!ctx.conditions?.isDesktop) return;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=360',
            scrub: true,
            pin: true,
            anticipatePin: 1,
            pinSpacing: false
          }
        });
        const lift = 120;
        tl.fromTo(h, { x: 160, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' })
          .add('liftStart', 0.45)
          .to(h, { y: -lift, ease: 'none' }, 'liftStart');
      });
    }, el);
    return () => {
      ctx.revert();
      mm.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-charcoal">
      <div className="container-edge min-h-[65svh] md:min-h-[80svh] flex items-center justify-center py-0">
        {isMobile ? (
          <motion.h2
            className="font-serif text-2xl md:text-4xl lg:text-5xl max-w-5xl text-center my-0"
            initial={{ x: 120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ amount: 0.6, once: false }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            Leadership Shapes Results.
          </motion.h2>
        ) : (
          <h2 ref={headlineRef} className="font-serif text-2xl md:text-4xl lg:text-5xl max-w-5xl text-center md:text-left my-0">
            Leadership Shapes Results.
          </h2>
        )}
      </div>
    </section>
  );
}


