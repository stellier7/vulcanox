"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ProgressBarProps = {
  forRef: React.RefObject<HTMLElement | HTMLDivElement>;
};

export function ProgressBar({ forRef }: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = forRef.current as HTMLElement | null;
    const bar = barRef.current;
    if (!target || !bar) return;

    const tween = gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      transformOrigin: '0 50%',
      scrollTrigger: {
        trigger: target,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [forRef]);

  return (
    <div className="fixed left-0 right-0 bottom-0 h-[2px] z-20">
      <div ref={barRef} className="h-full w-full bg-bronze" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}


