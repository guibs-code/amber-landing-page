import { NextRequest, NextResponse } from 'next/server';

interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const { email, turnstileToken, honeypot } = await request.json();

    // Honeypot field check (should be empty)
    if (honeypot) {
      return NextResponse.json(
        { error: 'Invalid submission' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Verify Turnstile token
    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'Security verification required' },
        { status: 400 }
      );
    }

    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET_KEY!,
          response: turnstileToken,
        }),
      }
    );

    const turnstileResult: TurnstileResponse = await turnstileResponse.json();

    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: 'Security verification failed. Please try again.' },
        { status: 400 }
      );
    }

    // Submit to Formspark
    const formsparkResponse = await fetch(
      `https://submit-form.com/${process.env.FORMSPARK_FORM_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          timestamp: new Date().toISOString(),
          source: 'amber-waitlist',
        }),
      }
    );

    if (!formsparkResponse.ok) {
      throw new Error('Failed to submit to Formspark');
    }

    return NextResponse.json(
      { success: true, message: 'Successfully joined the waitlist!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
} 