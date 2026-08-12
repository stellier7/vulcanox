"use client";

import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

type Props = { onReveal?: () => void; onHide?: () => void };

/**
 * Clean signature headline — no pin, no lift-into-card overlap.
 * Card reveal is handled by ShowcaseFade as its own section below.
 */
export function SignatureSlide({ onReveal, onHide }: Props) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const onRevealRef = useRef(onReveal);
  const onHideRef = useRef(onHide);
  onRevealRef.current = onReveal;
  onHideRef.current = onHide;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      end: 'bottom top',
      onEnter: () => onRevealRef.current?.(),
      onEnterBack: () => onRevealRef.current?.(),
      onLeaveBack: () => onHideRef.current?.()
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full overflow-x-clip bg-charcoal">
      <div className="container-edge flex items-center justify-center py-16 md:py-24">
        <motion.h2
          className="my-0 max-w-5xl text-center font-serif text-2xl md:text-left md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.45, once: true }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          We transform properties into high-performing investments.
        </motion.h2>
      </div>
    </section>
  );
}
