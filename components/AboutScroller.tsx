"use client";

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { AboutJack } from '@/components/AboutJack';

gsap.registerPlugin(ScrollTrigger);

export function AboutScroller() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
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
    const track = trackRef.current;
    const overlay = overlayRef.current;
    if (!el || !track) return;

    const ctx = gsap.context(() => {
      // Kill previous triggers for this section
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });

      if (isMobile) {
        // Mobile: fade image like Wellington card, text slides via FM in AboutJack
        const img = track.querySelector('.about-image') as HTMLElement | null;
        if (img) {
          gsap.set(img, { opacity: 0 });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              end: '+=110%',
              scrub: true
            }
          });
          tl.to(img, { opacity: 1, ease: 'none', duration: 0.5 })
            .to(img, { opacity: 0, ease: 'none', duration: 0.5 });
        }
      } else {
        // Desktop: pin with fade of whole block and slide of text only; image stays static
        gsap.set(track, { opacity: 0, clearProps: 'transform' });
        if (overlay) gsap.set(overlay, { opacity: 1 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: '+=220',
            scrub: true,
            pin: true,
            anticipatePin: 1,
            pinSpacing: true,
            onUpdate: (st) => { if (overlay) overlay.style.opacity = String(1 - st.progress); },
            onLeaveBack: () => { gsap.set(track, { opacity: 0 }); if (overlay) gsap.set(overlay, { opacity: 1 }); },
            onLeave: () => { gsap.set(track, { opacity: 1, clearProps: 'transform' }); if (overlay) gsap.set(overlay, { opacity: 0 }); }
          }
        });
        tl.fromTo(track, { opacity: 0 }, { opacity: 1, ease: 'none', duration: 1 })
          .fromTo(
            track.querySelectorAll('.about-text'),
            { x: 80, opacity: 0 },
            { x: 0, opacity: 1, ease: 'none', duration: 1 },
            0.1
          );
      }
    }, el);
    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="relative w-full bg-charcoal">
      {/* Overlay solo en desktop; en móvil lo ocultamos para no tapar el contenido */}
      <div ref={overlayRef} className="absolute inset-0 bg-charcoal pointer-events-none hidden md:block" />
      {isMobile ? (
        <div className="container-edge py-0">
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ amount: 0.4, once: false }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <AboutJack />
          </motion.div>
        </div>
      ) : (
        <div ref={trackRef} className="container-edge py-0 will-change-transform relative">
          <AboutJack />
        </div>
      )}
    </section>
  );
}


