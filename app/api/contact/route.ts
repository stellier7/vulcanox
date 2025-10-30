import { NextResponse } from 'next/server';

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const ipHits: Map<string, { count: number; resetAt: number }> = new Map();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = ipHits.get(ip);
  if (!rec || now > rec.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (rec.count >= RATE_LIMIT_MAX) return false;
  rec.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0] || 'unknown';
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const { firstName, lastName, email, phone, message, company } = body || {};
    if (company) {
      // Honeypot caught
      return NextResponse.json({ ok: true });
    }
    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Placeholder: wire email provider later
    if (!process.env.CONTACT_TO) {
      return NextResponse.json({ ok: true, message: 'Email disabled (CONTACT_TO missing). Logged only.' });
    }

    // Example: integrate Nodemailer/Resend here
    // For now, just acknowledge
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


