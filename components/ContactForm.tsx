"use client";

import { useState } from 'react';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(7, 'Invalid phone'),
  message: z.string().min(10, 'Please add more details'),
  company: z.string().max(0).optional() // honeypot
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    company: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
      for (const err of parsed.error.issues) {
        const key = err.path[0] as keyof FormValues;
        fieldErrors[key] = err.message;
      }
      setErrors(fieldErrors);
      // Validation failures are not server errors — keep status idle
      setStatus('idle');
      return;
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Failed');
      // Treat "accepted but not delivered" as an error so we don't fake success
      if (data?.delivered === false) throw new Error(data?.message || 'Delivery unavailable');
      setStatus('success');
      setValues({ firstName: '', lastName: '', email: '', phone: '', message: '', company: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        value={values.company}
        onChange={onChange}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="contact-firstName" className="block text-sm text-white/70">
            First name
          </label>
          <input
            id="contact-firstName"
            className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-bronze"
            name="firstName"
            value={values.firstName}
            onChange={onChange}
            placeholder="Jack"
            autoComplete="given-name"
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="contact-lastName" className="block text-sm text-white/70">
            Last name
          </label>
          <input
            id="contact-lastName"
            className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-bronze"
            name="lastName"
            value={values.lastName}
            onChange={onChange}
            placeholder="Agurcia"
            autoComplete="family-name"
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className="block text-sm text-white/70">
            Email
          </label>
          <input
            id="contact-email"
            className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-bronze"
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
            placeholder="you@company.com"
            autoComplete="email"
          />
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="contact-phone" className="block text-sm text-white/70">
            Phone
          </label>
          <input
            id="contact-phone"
            className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-bronze"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={onChange}
            placeholder="+1 555 123 4567"
            autoComplete="tel"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm text-white/70">
          Message
        </label>
        <textarea
          id="contact-message"
          className="mt-1 min-h-[140px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:border-bronze"
          name="message"
          value={values.message}
          onChange={onChange}
          placeholder="Tell us about your property or project..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="rounded-full bg-bronze px-6 py-3 text-sm font-medium text-black transition hover:brightness-110 disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>
        {status === 'success' && (
          <span className="text-green-400">Thanks — we will reach out shortly.</span>
        )}
        {status === 'error' && (
          <span className="text-red-400">Something went wrong. Try again.</span>
        )}
      </div>
    </form>
  );
}
