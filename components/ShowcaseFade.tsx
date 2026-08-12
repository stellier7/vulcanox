"use client";

import { motion } from 'framer-motion';
import { ShowcaseHorizontal } from '@/components/ShowcaseHorizontal';

type Props = { reveal: boolean; containerRef: React.RefObject<HTMLDivElement> };

export function ShowcaseFade({ reveal, containerRef }: Props) {
  return (
    <motion.div
      ref={containerRef}
      className="overflow-x-clip pb-16 pt-2 md:pb-24 md:pt-4"
      initial={{ opacity: 0, y: 28 }}
      animate={reveal ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.25, once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <ShowcaseHorizontal />
    </motion.div>
  );
}
