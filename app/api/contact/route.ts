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
    const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
    if (!rateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();
    const { firstName, lastName, email, phone, message, company } = body || {};
    if (company) {
      // Honeypot caught — pretend success
      return NextResponse.json({ ok: true, delivered: true });
    }
    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Email provider not wired yet — do not fake a successful delivery
    if (!process.env.CONTACT_TO) {
      console.warn('[VULCANOX] Contact form received but CONTACT_TO is not configured', {
        firstName,
        lastName,
        email,
        phone,
        messageLength: String(message).length
      });
      return NextResponse.json(
        {
          ok: false,
          delivered: false,
          error: 'Contact delivery is not configured',
          message: 'Email disabled (CONTACT_TO missing).'
        },
        { status: 503 }
      );
    }

    // TODO: integrate Nodemailer/Resend using CONTACT_TO
    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
