"use client";

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

type Props = { onReveal?: () => void; onHide?: () => void };

export function SignatureSlide({ onReveal, onHide }: Props) {
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
      mm.add(
        {
          isDesktop: '(min-width: 768px)'
        },
        (ctx) => {
          const isDesktop = ctx.conditions?.isDesktop;
          if (isDesktop) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: el,
                start: 'top top',
                end: '+=420',
                scrub: true,
                pin: true,
                anticipatePin: 1,
                pinSpacing: false,
                onEnter: () => { onHide && onHide(); },
                onLeaveBack: () => { onHide && onHide(); }
              }
            });
            const lift = 140;
            // Slide 2: headline slides in from the left to center
            tl.fromTo(h, { x: -160, opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' })
              // Slide 3: half-speed lift to title position
              .add('liftStart', 0.45)
              .to(h, { y: -lift, ease: 'none' }, 'liftStart')
              // Start card reveal as soon as lift begins for a smooth fade
              .add(() => { onReveal && onReveal(); }, 'liftStart');
          } else {
            // mobile: explicit scrubbed slide-in from off-screen, then slight lift
            gsap.set(h, { x: -120, opacity: 0 });
            gsap.to(h, {
              x: 0,
              opacity: 1,
              ease: 'power2.out',
              // Start later on mobile: when the slide is almost fully covering (top reaches bottom -> 100%)
              scrollTrigger: { trigger: el, start: 'top 100%', end: 'top 70%', scrub: true }
            });
            gsap.to(h, {
              y: -80,
              ease: 'none',
              // Begin lift a bit later as well to maintain full-black feel
              scrollTrigger: { trigger: el, start: 'top 60%', end: 'bottom top', scrub: true }
            });
            ScrollTrigger.create({
              trigger: el,
              start: 'top 60%',
              end: 'bottom top',
              onEnter: () => onReveal && onReveal(),
              onLeaveBack: () => onHide && onHide()
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
    <section ref={sectionRef as any} className="relative w-full bg-charcoal">
      <div className="container-edge min-h-[65svh] md:min-h-[90svh] flex items-center justify-center py-0">
        {isMobile ? (
          <motion.h2
            className="font-serif text-2xl md:text-4xl lg:text-5xl max-w-5xl text-center my-0"
            initial={{ x: -120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ amount: 0.6, once: false }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            We transform properties into high-performing investments.
          </motion.h2>
        ) : (
          <h2 ref={headlineRef} className="font-serif text-2xl md:text-4xl lg:text-5xl max-w-5xl text-center md:text-left my-0">
            We transform properties into high-performing investments.
          </h2>
        )}
        {/* Mobile-only: render child content (Wellington card) directly under headline */}
      </div>
    </section>
  );
}


