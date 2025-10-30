"use client";

import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import Image from 'next/image';

export function TestimonialCarousel() {
  const controls = useAnimationControls();

  useEffect(() => {
    let mounted = true;
    async function loop() {
      while (mounted) {
        await controls.start({ x: [-8, 8, -8], transition: { duration: 8, repeat: 0, ease: 'easeInOut' } });
      }
    }
    loop();
    return () => { mounted = false; };
  }, [controls]);

  return (
    <section className="bg-charcoal">
      <div className="container-edge py-24 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-2">
          <div className="text-sm uppercase tracking-wide text-white/60">Testimonial</div>
          <blockquote className="mt-3 font-serif text-2xl md:text-4xl leading-tight">
            “VULCANOX transformed our property into a profitable, high-quality asset. Their discipline and
            execution were exceptional from start to finish.”
          </blockquote>
          <div className="mt-4 text-white/70">— Norma Suarez</div>
        </div>
        <motion.div animate={controls} className="relative h-[40vh] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10">
          <Image src="/images/normaSuarez.png" alt="Norma Suarez property" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        </motion.div>
      </div>
    </section>
  );
}


