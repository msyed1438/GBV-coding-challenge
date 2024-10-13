import { sql } from '@vercel/postgres';

export async function GET() {
  try {
    const result = await sql`SELECT NOW() as current_time;`;
    return new Response(JSON.stringify({ time: result.rows[0].current_time }), { status: 200 });
  } catch (error) {
    console.error('Failed to connect to database:', error);
    return new Response(JSON.stringify({ error: 'Failed to connect to the database' }), { status: 500 });
  }
}