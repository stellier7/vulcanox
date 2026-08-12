"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export function AboutJack() {
  return (
    <section className="bg-charcoal">
      <div className="container-edge py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Mobile-only headline above the image */}
        <div className="md:hidden">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="text-center font-serif text-3xl"
          >
            Leadership Shapes Results.
          </motion.h3>
        </div>

        <div
          className="about-image relative h-[60vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 lg:h-[70vh]"
        >
          <Image src="/images/jack.jpeg" alt="Jack A. Agurcia" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
        <div className="min-w-0">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="about-text hidden text-left font-serif text-3xl md:block md:text-5xl lg:ml-8"
          >
            Leadership Shapes Results.
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="about-text mt-6 space-y-4 text-white/80"
          >
            <p>
              Jack A. Agurcia is a licensed General Contractor and strategic real estate investor. Over the
              past decade, he has overseen multi-million-dollar residential, commercial, and hospitality projects
              across Florida.
            </p>
            <p>
              With a background that spans hands-on construction, financial planning, and project management,
              Jack understands how to transform property into performance.
            </p>
            <p>
              Outside the field, he is a diver, expedition traveler, and Brazilian Jiu-Jitsu practitioner —
              disciplines that reflect his approach: precision, resilience, and decisive execution.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


