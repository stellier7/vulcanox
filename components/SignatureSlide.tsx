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
                end: '+=320',
                scrub: true,
                pin: true,
                anticipatePin: 1,
                pinSpacing: true,
                onEnter: () => {
                  onHide && onHide();
                },
                onLeaveBack: () => {
                  onHide && onHide();
                },
                onLeave: () => {
                  onReveal && onReveal();
                }
              }
            });
            // Headline slides in cleanly — no upward lift into the next section
            tl.fromTo(
              h,
              { xPercent: -8, opacity: 0 },
              { xPercent: 0, opacity: 1, ease: 'power2.out' }
            ).add(() => {
              onReveal && onReveal();
            }, 0.65);
          } else {
            gsap.set(h, { xPercent: -6, opacity: 0 });
            gsap.to(h, {
              xPercent: 0,
              opacity: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                end: 'top 55%',
                scrub: true
              }
            });
            ScrollTrigger.create({
              trigger: el,
              start: 'top 55%',
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
    <section ref={sectionRef as any} className="relative w-full overflow-x-hidden bg-charcoal">
      <div className="container-edge flex min-h-[55svh] items-center justify-center py-16 md:min-h-[75svh] md:py-24">
        {isMobile ? (
          <motion.h2
            className="my-0 max-w-5xl text-center font-serif text-2xl md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.55, once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            We transform properties into high-performing investments.
          </motion.h2>
        ) : (
          <h2
            ref={headlineRef}
            className="my-0 max-w-5xl text-center font-serif text-2xl md:text-left md:text-4xl lg:text-5xl"
          >
            We transform properties into high-performing investments.
          </h2>
        )}
      </div>
    </section>
  );
}
