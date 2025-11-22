import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendDeploymentNotification } from '@/lib/email';

/**
 * POST /api/webhooks/vercel
 * Handle Vercel deployment webhook events
 * 
 * This endpoint receives webhook events from Vercel when deployments complete.
 * It verifies the webhook signature and sends email notifications to subscribers.
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature for security
    const signature = request.headers.get('x-vercel-signature');
    const webhookSecret = process.env.VERCEL_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error('VERCEL_WEBHOOK_SECRET is not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      );
    }

    // Get raw body for signature verification
    const body = await request.text();
    
    if (signature) {
      // Verify signature (Vercel uses HMAC SHA256)
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(body)
        .digest('hex');
      
      const providedSignature = signature.replace('sha256=', '');
      
      if (expectedSignature !== providedSignature) {
        console.error('Invalid webhook signature');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    // Parse webhook payload
    const payload = JSON.parse(body);
    const { type, payload: eventPayload } = payload;

    // Only process deployment events
    if (type !== 'deployment') {
      return NextResponse.json(
        { message: 'Event type not handled', type },
        { status: 200 }
      );
    }

    const {
      id,
      url,
      state,
      target,
      createdAt,
      meta,
    } = eventPayload;

    // Only send notifications for successful production deployments
    if (state !== 'READY' || target !== 'production') {
      return NextResponse.json(
        { 
          message: 'Deployment not ready or not production',
          state,
          target 
        },
        { status: 200 }
      );
    }

    // Extract version from meta or use deployment ID
    const version = meta?.githubCommitSha?.substring(0, 7) || id.substring(0, 7);
    const commitMessage = meta?.githubCommitMessage || 'New deployment';
    const commitAuthor = meta?.githubCommitAuthorName || 'Unknown';

    // Get changelog URL (assuming CHANGELOG.md is in the repo)
    const repoUrl = process.env.GITHUB_REPO_URL || 'https://github.com/gurkanfikretgunak/cursor';
    const changelogUrl = `${repoUrl}/blob/main/CHANGELOG.md`;

    // Send email notifications to all active subscribers
    try {
      await sendDeploymentNotification({
        version,
        url,
        deploymentId: id,
        commitMessage,
        commitAuthor,
        changelogUrl,
        deployedAt: new Date(createdAt),
      });

      return NextResponse.json(
        {
          message: 'Deployment notification sent successfully',
          deploymentId: id,
          version,
        },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Failed to send deployment notifications:', emailError);
      // Don't fail the webhook if email sending fails
      return NextResponse.json(
        {
          message: 'Deployment processed but email notification failed',
          error: emailError instanceof Error ? emailError.message : 'Unknown error',
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      {
        error: 'Failed to process webhook',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/webhooks/vercel
 * Health check endpoint for webhook configuration
 */
export async function GET() {
  return NextResponse.json(
    {
      message: 'Vercel webhook endpoint is active',
      configured: !!process.env.VERCEL_WEBHOOK_SECRET,
    },
    { status: 200 }
  );
}


