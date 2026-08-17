"use client";

import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = { onReveal?: () => void; onHide?: () => void };

/**
 * Signature headline with scroll-scrubbed slide-in. Pinned on desktop only;
 * card reveal is handled by ShowcaseFade below (no lift overlap).
 */
export function SignatureSlide({ onReveal, onHide }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const onRevealRef = useRef(onReveal);
  const onHideRef = useRef(onHide);
  onRevealRef.current = onReveal;
  onHideRef.current = onHide;

  const useIso = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIso(() => {
    const el = sectionRef.current;
    const h = headlineRef.current;
    if (!el || !h) return;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=280',
            scrub: true,
            pin: true,
            anticipatePin: 1,
            pinSpacing: true,
            onLeave: () => onRevealRef.current?.(),
            onEnterBack: () => onHideRef.current?.(),
            onLeaveBack: () => onHideRef.current?.()
          }
        });

        tl.fromTo(
          h,
          { xPercent: -10, opacity: 0 },
          { xPercent: 0, opacity: 1, ease: 'power2.out' }
        ).add(() => {
          onRevealRef.current?.();
        }, 0.6);
      });

      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(
          h,
          { xPercent: -8, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 98%',
              end: 'top 86%',
              scrub: true
            }
          }
        );

        ScrollTrigger.create({
          trigger: el,
          start: 'top 96%',
          end: 'bottom top',
          onEnter: () => onRevealRef.current?.(),
          onEnterBack: () => onRevealRef.current?.(),
          onLeaveBack: () => onHideRef.current?.()
        });
      });
    }, el);

    return () => {
      ctx.revert();
      mm.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-x-clip bg-charcoal max-md:min-h-0">
      <div className="container-edge flex items-start justify-center pt-4 pb-0 md:items-center md:pt-16 md:pb-6">
        <h2
          ref={headlineRef}
          className="my-0 max-w-4xl text-center font-serif text-2xl leading-snug md:text-4xl md:leading-tight lg:text-5xl"
        >
          We transform properties into high-performing investments.
        </h2>
      </div>
    </section>
  );
}
