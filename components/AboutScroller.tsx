"use client";

import { motion } from 'framer-motion';
import { AboutJack } from '@/components/AboutJack';

export function AboutScroller() {
  return (
    <section className="relative w-full overflow-x-clip bg-charcoal">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: true }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <AboutJack />
      </motion.div>
    </section>
  );
}
