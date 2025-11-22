import { NextRequest, NextResponse } from 'next/server';
import { unsubscribeSubscriber } from '@/lib/db';

/**
 * POST /api/unsubscribe
 * Unsubscribe an email address from deployment notifications
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, token } = body;

    // Validate that either email or token is provided
    if (!email && !token) {
      return NextResponse.json(
        { error: 'Email or unsubscribe token is required' },
        { status: 400 }
      );
    }

    const identifier = email || token;
    const success = await unsubscribeSubscriber(identifier);

    if (!success) {
      return NextResponse.json(
        { error: 'Email not found or already unsubscribed' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully unsubscribed from deployment notifications' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/unsubscribe?email=... or /api/unsubscribe?token=...
 * Unsubscribe via GET request (for email links)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email && !token) {
      return NextResponse.json(
        { error: 'Email or unsubscribe token is required' },
        { status: 400 }
      );
    }

    const identifier = email || token;
    const success = await unsubscribeSubscriber(identifier);

    if (!success) {
      return NextResponse.json(
        { error: 'Email not found or already unsubscribed' },
        { status: 404 }
      );
    }

    // Return HTML page for better UX
    return new NextResponse(
      `<!DOCTYPE html>
<html>
<head>
  <title>Unsubscribed</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      text-align: center;
      max-width: 500px;
    }
    h1 { color: #333; margin-top: 0; }
    p { color: #666; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <h1>✓ Unsubscribed</h1>
    <p>You have been successfully unsubscribed from deployment notifications.</p>
    <p>You will no longer receive emails about new releases.</p>
  </div>
</body>
</html>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe. Please try again later.' },
      { status: 500 }
    );
  }
}

