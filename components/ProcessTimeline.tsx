"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { title: 'Assess', desc: 'Site evaluation, scope, and investment thesis.' },
  { title: 'Design', desc: 'Value-focused design and budgeting.' },
  { title: 'Build', desc: 'Execution with schedule and cost control.' },
  { title: 'Perform', desc: 'Delivery, lease-up, and optimization.' }
];

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.proc-step');
    const ctx = gsap.context(() => {
      cards.forEach((card, idx) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: card as Element,
              start: 'top 90%',
              end: 'top 60%',
              scrub: 1.2 // slower and reversible
            }
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-charcoal" ref={sectionRef}>
      <div className="container-edge py-24">
        <h3 className="font-serif text-3xl md:text-5xl mb-10">Investment Process</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="proc-step rounded-xl border border-white/10 bg-white/5 p-6 will-change-transform">
              <div className="text-sm uppercase tracking-wide text-white/60">Step {i + 1}</div>
              <div className="mt-2 font-serif text-2xl">{s.title}</div>
              <p className="mt-3 text-white/80">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


