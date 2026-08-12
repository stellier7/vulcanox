"use client";

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShowcaseHorizontal } from '@/components/ShowcaseHorizontal';

gsap.registerPlugin(ScrollTrigger);

type Props = { reveal: boolean; containerRef: React.RefObject<HTMLDivElement> };

export function ShowcaseFade({ reveal, containerRef }: Props) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y: 28 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: 'top 45%',
          scrub: true
        }
      });
    }, el);

    return () => ctx.revert();
  }, [containerRef]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Soft boost when signature hands off, without overlapping the headline
    if (reveal) {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', overwrite: 'auto' });
    }
  }, [reveal, containerRef]);

  return (
    <div
      ref={containerRef}
      className="will-change-[opacity,transform] overflow-x-hidden pb-10 pt-4 md:pb-16 md:pt-8"
    >
      <ShowcaseHorizontal />
    </div>
  );
}
