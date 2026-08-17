"use client";

import { motion } from 'framer-motion';
import { ShowcaseHorizontal } from '@/components/ShowcaseHorizontal';

type Props = { reveal: boolean; containerRef: React.RefObject<HTMLDivElement> };

export function ShowcaseFade({ reveal, containerRef }: Props) {
  return (
    <motion.div
      ref={containerRef}
      className={`overflow-x-clip pb-16 pt-0 md:pb-24 md:-mt-1 ${
        reveal ? '' : 'max-md:h-0 max-md:overflow-hidden max-md:pb-0 max-md:opacity-0'
      }`}
      initial={false}
      animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <ShowcaseHorizontal />
    </motion.div>
  );
}
