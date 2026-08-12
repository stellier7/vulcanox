"use client";

import { useRef, useState } from 'react';
import { Hero } from '@/components/Hero';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { ContactForm } from '@/components/ContactForm';
import { SignatureSlide } from '@/components/SignatureSlide';
import { ShowcaseFade } from '@/components/ShowcaseFade';
import { AboutScroller } from '@/components/AboutScroller';

export default function HomePage() {
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const [revealCard, setRevealCard] = useState(false);
  const contactRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen overflow-x-clip">
      <Hero
        onScrollToProjects={() => scrollTo(projectsRef)}
        onScrollToContact={() => scrollTo(contactRef)}
      />

      {/* Content wrapper above the video; solid bg prevents any bleed-through */}
      <div className="relative z-10 overflow-x-clip bg-charcoal">
        <SignatureSlide onReveal={() => setRevealCard(true)} onHide={() => setRevealCard(false)} />

        <ShowcaseFade reveal={revealCard} containerRef={projectsRef} />

        <AboutScroller />

        <ProcessTimeline />

        <TestimonialCarousel />

        <section ref={contactRef} className="bg-charcoal">
          <div className="container-edge py-24">
            <h2 className="text-center font-serif text-3xl md:text-5xl">Contact</h2>
            <p className="mt-3 text-center text-white/70">First & last name, email, phone, message.</p>
            <div className="mx-auto mt-6 max-w-2xl">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
