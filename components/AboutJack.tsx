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
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl text-center"
          >
            Leadership Shapes Results.
          </motion.h3>
        </div>

        <div
          className="about-image relative w-full h-[60vh] lg:h-[70vh] rounded-2xl overflow-hidden bg-white/5 border border-white/10"
        >
          <Image src="/images/jack.jpeg" alt="Jack A. Agurcia" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
        <div>
          <motion.h3
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="hidden md:block font-serif text-3xl md:text-5xl text-left lg:ml-8 about-text"
          >
            Leadership Shapes Results.
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 space-y-4 text-white/80 about-text"
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


