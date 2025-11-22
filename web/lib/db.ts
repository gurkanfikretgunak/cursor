/**
 * Database utilities for subscriber management
 * 
 * This module provides database connection and query utilities.
 * Supports both Supabase and raw PostgreSQL connections.
 */

export interface Subscriber {
  id: string;
  email: string;
  subscribed_at: Date;
  unsubscribed_at: Date | null;
  verified: boolean;
  verification_token?: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * Get database client
 * Supports Supabase or raw PostgreSQL via DATABASE_URL
 */
export async function getDbClient() {
  // Try Supabase first if SUPABASE_URL is set
  if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const { createClient } = await import('@supabase/supabase-js');
    return createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
  }

  // Fallback to raw PostgreSQL if DATABASE_URL is set
  if (process.env.DATABASE_URL) {
    const { Pool } = await import('pg');
    return new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false },
    });
  }

  throw new Error('Database configuration not found. Set either SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY or DATABASE_URL');
}

/**
 * Get active subscribers (not unsubscribed)
 */
export async function getActiveSubscribers(): Promise<Subscriber[]> {
  const client = await getDbClient();
  
  // Supabase client
  if ('from' in client) {
    const { data, error } = await client
      .from('subscribers')
      .select('*')
      .is('unsubscribed_at', null)
      .eq('verified', true);
    
    if (error) throw error;
    return (data || []).map(mapSupabaseRow);
  }
  
  // PostgreSQL Pool
  const result = await client.query(
    `SELECT * FROM subscribers 
     WHERE unsubscribed_at IS NULL AND verified = true 
     ORDER BY subscribed_at DESC`
  );
  
  return result.rows.map(mapPostgresRow);
}

/**
 * Add a new subscriber
 */
export async function addSubscriber(email: string, verificationToken: string): Promise<Subscriber> {
  const client = await getDbClient();
  const now = new Date();
  
  // Supabase client
  if ('from' in client) {
    const { data, error } = await client
      .from('subscribers')
      .insert({
        email,
        subscribed_at: now.toISOString(),
        verified: false,
        verification_token: verificationToken,
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      })
      .select()
      .single();
    
    if (error) throw error;
    return mapSupabaseRow(data);
  }
  
  // PostgreSQL Pool
  const result = await client.query(
    `INSERT INTO subscribers (email, subscribed_at, verified, verification_token, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [email, now, false, verificationToken, now, now]
  );
  
  return mapPostgresRow(result.rows[0]);
}

/**
 * Verify a subscriber by token
 */
export async function verifySubscriber(token: string): Promise<Subscriber | null> {
  const client = await getDbClient();
  
  // Supabase client
  if ('from' in client) {
    const { data, error } = await client
      .from('subscribers')
      .update({ verified: true, verification_token: null, updated_at: new Date().toISOString() })
      .eq('verification_token', token)
      .select()
      .single();
    
    if (error || !data) return null;
    return mapSupabaseRow(data);
  }
  
  // PostgreSQL Pool
  const result = await client.query(
    `UPDATE subscribers 
     SET verified = true, verification_token = NULL, updated_at = $1
     WHERE verification_token = $2
     RETURNING *`,
    [new Date(), token]
  );
  
  return result.rows.length > 0 ? mapPostgresRow(result.rows[0]) : null;
}

/**
 * Unsubscribe a user by email or token
 */
export async function unsubscribeSubscriber(identifier: string): Promise<boolean> {
  const client = await getDbClient();
  const now = new Date();
  
  // Supabase client
  if ('from' in client) {
    const { data, error } = await client
      .from('subscribers')
      .update({ unsubscribed_at: now.toISOString(), updated_at: now.toISOString() })
      .or(`email.eq.${identifier},verification_token.eq.${identifier}`)
      .is('unsubscribed_at', null)
      .select();
    
    if (error) throw error;
    return (data?.length || 0) > 0;
  }
  
  // PostgreSQL Pool
  const result = await client.query(
    `UPDATE subscribers 
     SET unsubscribed_at = $1, updated_at = $1
     WHERE (email = $2 OR verification_token = $2) 
       AND unsubscribed_at IS NULL
     RETURNING *`,
    [now, identifier]
  );
  
  return result.rows.length > 0;
}

/**
 * Check if email already exists
 */
export async function subscriberExists(email: string): Promise<boolean> {
  const client = await getDbClient();
  
  // Supabase client
  if ('from' in client) {
    const { data, error } = await client
      .from('subscribers')
      .select('id')
      .eq('email', email)
      .limit(1);
    
    if (error) throw error;
    return (data?.length || 0) > 0;
  }
  
  // PostgreSQL Pool
  const result = await client.query(
    'SELECT id FROM subscribers WHERE email = $1 LIMIT 1',
    [email]
  );
  
  return result.rows.length > 0;
}

// Helper functions to map database rows to Subscriber interface
function mapSupabaseRow(row: any): Subscriber {
  return {
    id: row.id,
    email: row.email,
    subscribed_at: new Date(row.subscribed_at),
    unsubscribed_at: row.unsubscribed_at ? new Date(row.unsubscribed_at) : null,
    verified: row.verified,
    verification_token: row.verification_token,
    created_at: new Date(row.created_at),
    updated_at: new Date(row.updated_at),
  };
}

function mapPostgresRow(row: any): Subscriber {
  return {
    id: row.id,
    email: row.email,
    subscribed_at: row.subscribed_at,
    unsubscribed_at: row.unsubscribed_at,
    verified: row.verified,
    verification_token: row.verification_token,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

