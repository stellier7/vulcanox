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
      gsap.set(el, { opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          end: '+=110%',
          scrub: true
        }
      });
      tl.to(el, { opacity: 1, ease: 'none', duration: 0.5 })
        .to(el, { opacity: 0, ease: 'none', duration: 0.5 });
    }, el);
    return () => ctx.revert();
  }, [containerRef]);

  return (
    <div ref={containerRef} className={`will-change-[opacity] mt-[-24vh] md:mt-[-2px]`}>
      <ShowcaseHorizontal />
    </div>
  );
}


