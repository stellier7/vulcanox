"use client";

import { useRef, useState } from 'react';
import { Hero } from '@/components/Hero';
import { ShowcaseHorizontal } from '@/components/ShowcaseHorizontal';
import { AboutJack } from '@/components/AboutJack';
import { ProcessTimeline } from '@/components/ProcessTimeline';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { ContactForm } from '@/components/ContactForm';
import { SignatureSlide } from '@/components/SignatureSlide';
import { ShowcaseFade } from '@/components/ShowcaseFade';
import { AboutScroller } from '@/components/AboutScroller';
// SignatureLift/ShowcaseReveal not used in unified flow
// Removed animated About intro to disable slide animation

export default function HomePage() {
  console.log('[VULCANOX] HomePage rendering');
  
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const [revealCard, setRevealCard] = useState(false);
  const contactRef = useRef<HTMLDivElement | null>(null);

  // Reveal is controlled exclusively by SignatureSlide (liftStart) to avoid early appearance on mobile

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      <Hero
        onScrollToProjects={() => scrollTo(projectsRef)}
        onScrollToContact={() => scrollTo(contactRef)}
      />

      {/* Content wrapper above the video; solid bg prevents any bleed-through */}
      <div className="relative z-10 bg-charcoal">
        {/* Slide 2 & 3 unified: emit reveal at end */}
        <SignatureSlide onReveal={() => setRevealCard(true)} onHide={() => setRevealCard(false)} />

        {/* Slide 4: card block rendered after slide (we'll keep tight spacing) */}
        <ShowcaseFade reveal={revealCard} containerRef={projectsRef} />

        {/* About section: image + headline + text scrolling in as a unit */}
        <AboutScroller />

        <ProcessTimeline />

        <TestimonialCarousel />

        <section ref={contactRef} className="bg-charcoal">
          <div className="container-edge py-24">
            <h2 className="font-serif text-3xl md:text-5xl text-center">Contact</h2>
            <p className="text-white/70 mt-3 text-center">First & last name, email, phone, message.</p>
            <div className="mt-6 max-w-2xl mx-auto">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}


