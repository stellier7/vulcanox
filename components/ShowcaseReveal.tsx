"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShowcaseHorizontal } from '@/components/ShowcaseHorizontal';

gsap.registerPlugin(ScrollTrigger);

export function ShowcaseReveal() {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    gsap.set(el, { opacity: 0, y: 20, scale: 0.98 });
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      end: 'top 60%',
      scrub: true
    });
    const tween = gsap.to(el, { opacity: 1, y: 0, scale: 1, ease: 'power2.out', duration: 0.6 });
    st.animation = tween as any;
    return () => {
      st.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="bg-charcoal">
      <div ref={wrapRef} className="container-edge py-10">
        <ShowcaseHorizontal />
      </div>
    </section>
  );
}


