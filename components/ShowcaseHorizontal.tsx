"use client";

import Image from 'next/image';

type Project = {
  id: string;
  city: string;
  type: string;
  image: string;
};

const projects: Project[] = [
  {
    id: 'p1',
    city: 'Wellington',
    type: 'Condo Renovation',
    image: '/images/projects/featured.jpeg'
  }
];

export function ShowcaseHorizontal() {
  return (
    <section className="w-full bg-charcoal overflow-x-hidden">
      <div className="container-edge py-0">
        <div className="flex justify-center">
          {projects.map((p) => (
            <article
              key={p.id}
              className="relative w-full max-w-4xl h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden bg-white/5 border border-white/10"
            >
              <div className="absolute inset-0">
                <Image
                  src={p.image}
                  alt={`${p.city} — ${p.type}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />
              </div>
              <div className="relative z-10 h-full p-6 flex items-end">
                <div>
                  <div className="text-sm uppercase tracking-wide text-white/70">{p.city}</div>
                  <div className="font-serif text-2xl md:text-3xl">{p.type}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


