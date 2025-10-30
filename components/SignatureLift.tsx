"use client";

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export function SignatureLift() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIso(() => {
    if (isMobile) return; // desktop logic only; mobile handled by FM
    const el = sectionRef.current;
    const h = headlineRef.current;
    if (!el || !h) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top top',
        end: '+=280',
        scrub: true,
        pin: true,
        anticipatePin: 1
      }
    });

    const lift = 120;
    tl.fromTo(h, { y: 0, opacity: 1 }, { y: -lift, ease: 'none' });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef as any} className="relative w-full bg-charcoal">
      <div className="container-edge min-h-[80svh] md:min-h-[90svh] flex items-center justify-center py-12">
        {isMobile ? (
          <motion.h2
            className="font-serif text-2xl md:text-4xl lg:text-5xl max-w-5xl text-center"
            initial={{ y: 0 }}
            whileInView={{ y: -60 }}
            viewport={{ amount: 0.7, once: false }}
            transition={{ duration: 0.6, ease: 'linear' }}
          >
            We transform properties into high-performing investments.
          </motion.h2>
        ) : (
          <h2 ref={headlineRef} className="font-serif text-2xl md:text-4xl lg:text-5xl max-w-5xl text-center md:text-left">
            We transform properties into high-performing investments.
          </h2>
        )}
      </div>
    </section>
  );
}


