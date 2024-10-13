import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const { rows: users } = await sql`
      SELECT u.id, u.username, COUNT(a.id) AS questionnairesCompleted
      FROM users u
      LEFT JOIN user_answers a ON u.id = a.user_id
      GROUP BY u.id;
    `;

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
    });
  }
}
