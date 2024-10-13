// src/app/api/answers/route.js
import { sql } from "@vercel/postgres";

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, questionnaireId, answers } = body;

    if (!userId || !questionnaireId) {
      throw new Error("Missing userId or questionnaireId");
    }

    if (!userId || !questionnaireId || !answers) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
      });
    }

    console.log("Received userId:", userId);
    console.log("Received questionnaireId:", questionnaireId);
    console.log("Received answers:", answers);

    // Insert answers into the database
    const insertPromises = answers.map((answer) => {
      return sql`
        INSERT INTO user_answers (user_id, question_id, answer)
        VALUES (${userId}, ${answer.questionId}, ${answer.answer})
        ON CONFLICT (user_id, question_id) DO UPDATE
        SET answer = EXCLUDED.answer;
      `;
    });

    await Promise.all(insertPromises);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error during answer submission:", error);
    return new Response(JSON.stringify({ error: "Failed to submit answers" }), {
      status: 500,
    });
  }
}
