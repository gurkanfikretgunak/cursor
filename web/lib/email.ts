/**
 * Email service using Resend
 * Handles sending deployment notifications to subscribers
 */

import { Resend } from 'resend';
import { getActiveSubscribers } from './db';

// Initialize Resend lazily to avoid build-time errors when API key is missing
function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
}

export interface DeploymentNotificationData {
  version: string;
  url: string;
  deploymentId: string;
  commitMessage: string;
  commitAuthor: string;
  changelogUrl: string;
  deployedAt: Date;
}

/**
 * Send deployment notification email to all active subscribers
 */
export async function sendDeploymentNotification(data: DeploymentNotificationData): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'notifications@example.com';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || 'https://example.com';

  // Get all active subscribers
  const subscribers = await getActiveSubscribers();

  if (subscribers.length === 0) {
    console.log('No active subscribers to notify');
    return;
  }

  // Format deployment date
  const deployedDate = data.deployedAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Create email HTML template
  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Deployment Available</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; color: white;">
    <h1 style="margin: 0; font-size: 24px;">🚀 New Deployment Available</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Version ${data.version}</p>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
    <h2 style="margin-top: 0; color: #333;">What's New?</h2>
    <p style="color: #666; margin-bottom: 20px;">
      A new version of the application has been successfully deployed to production.
    </p>
    
    <div style="background: white; padding: 20px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #667eea;">
      <p style="margin: 0 0 10px 0;"><strong>Deployment Details:</strong></p>
      <ul style="margin: 0; padding-left: 20px; color: #666;">
        <li><strong>Version:</strong> ${data.version}</li>
        <li><strong>Deployed:</strong> ${deployedDate}</li>
        <li><strong>Author:</strong> ${data.commitAuthor}</li>
        <li><strong>Commit:</strong> ${data.commitMessage}</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${data.url}" 
         style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-right: 10px;">
        View Deployment
      </a>
      <a href="${data.changelogUrl}" 
         style="display: inline-block; background: white; color: #667eea; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600; border: 2px solid #667eea;">
        View Changelog
      </a>
    </div>
    
    <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
    
    <p style="color: #999; font-size: 12px; margin: 0;">
      You're receiving this email because you subscribed to deployment notifications.
      <br>
      <a href="${siteUrl}/api/unsubscribe?email={{email}}" style="color: #999; text-decoration: underline;">
        Unsubscribe from these notifications
      </a>
    </p>
  </div>
</body>
</html>
  `;

  // Create plain text version
  const emailText = `
New Deployment Available - Version ${data.version}

A new version of the application has been successfully deployed to production.

Deployment Details:
- Version: ${data.version}
- Deployed: ${deployedDate}
- Author: ${data.commitAuthor}
- Commit: ${data.commitMessage}

View Deployment: ${data.url}
View Changelog: ${data.changelogUrl}

---
You're receiving this email because you subscribed to deployment notifications.
Unsubscribe: ${siteUrl}/api/unsubscribe?email={{email}}
  `;

  // Send emails to all subscribers
  const resend = getResendClient();
  const emailPromises = subscribers.map(async (subscriber) => {
    try {
      // Replace {{email}} placeholder with actual email for unsubscribe link
      const personalizedHtml = emailHtml.replace(/\{\{email\}\}/g, encodeURIComponent(subscriber.email));
      const personalizedText = emailText.replace(/\{\{email\}\}/g, encodeURIComponent(subscriber.email));

      await resend.emails.send({
        from: fromEmail,
        to: subscriber.email,
        subject: `🚀 New Deployment Available - Version ${data.version}`,
        html: personalizedHtml,
        text: personalizedText,
      });

      console.log(`Deployment notification sent to ${subscriber.email}`);
    } catch (error) {
      console.error(`Failed to send notification to ${subscriber.email}:`, error);
      // Continue with other subscribers even if one fails
    }
  });

  // Wait for all emails to be sent
  await Promise.allSettled(emailPromises);
}

/**
 * Send verification email to a new subscriber
 */
export async function sendVerificationEmail(email: string, verificationToken: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'notifications@example.com';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || 'https://example.com';
  const verificationUrl = `${siteUrl}/api/subscribe/verify?token=${verificationToken}`;

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Subscription</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; color: white;">
    <h1 style="margin: 0; font-size: 24px;">Verify Your Subscription</h1>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px;">
    <p style="color: #666; margin-bottom: 20px;">
      Thank you for subscribing to deployment notifications! Please verify your email address to start receiving updates.
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${verificationUrl}" 
         style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
        Verify Email Address
      </a>
    </div>
    
    <p style="color: #999; font-size: 12px; margin-top: 30px;">
      If the button doesn't work, copy and paste this link into your browser:<br>
      <a href="${verificationUrl}" style="color: #667eea; word-break: break-all;">${verificationUrl}</a>
    </p>
  </div>
</body>
</html>
  `;

  const emailText = `
Verify Your Subscription

Thank you for subscribing to deployment notifications! Please verify your email address to start receiving updates.

Verify your email: ${verificationUrl}
  `;

  const resend = getResendClient();
  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: 'Verify Your Subscription to Deployment Notifications',
    html: emailHtml,
    text: emailText,
  });
}





