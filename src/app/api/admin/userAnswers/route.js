// src/app/api/admin/userAnswers/route.js
import { sql } from "@vercel/postgres";

export async function GET(request) {
  const userId = new URL(request.url).searchParams.get("userId");

  try {
    const { rows: answers } = await sql`
      SELECT q.id AS questionId, q.question->>'question' AS questionText, a.answer
      FROM user_answers a
      JOIN questionnaire_questions q ON a.question_id = q.id
      WHERE a.user_id = ${userId};
    `;

    return new Response(JSON.stringify(answers), { status: 200 });
  } catch (error) {
    console.error("Error fetching answers for user:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch answers" }), {
      status: 500,
    });
  }
}
