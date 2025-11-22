import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber, subscriberExists } from '@/lib/db';
import crypto from 'crypto';

/**
 * POST /api/subscribe
 * Subscribe an email address to deployment notifications
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const exists = await subscriberExists(email);
    if (exists) {
      return NextResponse.json(
        { message: 'Email is already subscribed', alreadySubscribed: true },
        { status: 200 }
      );
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Add subscriber
    const subscriber = await addSubscriber(email.toLowerCase(), verificationToken);

    // Send verification email
    try {
      const { sendVerificationEmail } = await import('@/lib/email');
      await sendVerificationEmail(email.toLowerCase(), verificationToken);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Continue even if email fails - subscription is still created
    }

    return NextResponse.json(
      {
        message: 'Subscription successful. Please check your email to verify your subscription.',
        subscriberId: subscriber.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/subscribe/verify?token=...
 * Verify a subscription using a verification token
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    const { verifySubscriber } = await import('@/lib/db');
    const subscriber = await verifySubscriber(token);

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Invalid or expired verification token' },
        { status: 400 }
      );
    }

    // Redirect to a success page or return success message
    return NextResponse.json(
      { message: 'Email verified successfully. You will now receive deployment notifications.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify subscription. Please try again later.' },
      { status: 500 }
    );
  }
}

