import { sql } from "@vercel/postgres";

export async function GET(request, { params }) {
  const { id } = params; // Questionnaire ID
  const userId = new URL(request.url).searchParams.get("userId"); // User ID from query params

  try {
    console.log("Fetching rows"); // Log before querying
    const { rows } = await sql`
        SELECT q.id, q.question, a.answer
        FROM questionnaire_junction jq
        JOIN questionnaire_questions q ON jq.question_id = q.id
        LEFT JOIN user_answers a ON q.id = a.question_id AND a.user_id = ${userId}
        WHERE jq.questionnaire_id = ${id}
        ORDER BY jq.priority ASC;
      `;

    console.log("Fetched rows from database:", rows); // Log the rows returned

    // Clean up the question field and parse it
    const parsedRows = rows.map((row) => {
      let parsedQuestion = row.question;

      // Parse the nested JSON string inside the `question.question` field
      if (
        typeof parsedQuestion === "object" &&
        typeof parsedQuestion.question === "string"
      ) {
        parsedQuestion.question = JSON.parse(
          parsedQuestion.question.replace(/\n/g, "").replace(/\+\s*/g, "")
        );
      }

      return {
        ...row,
        question: parsedQuestion,
      };
    });

    console.log("The new parsed rows:", parsedRows); // Log the parsed rows
    console.log('What the exact out put looks like for one: ', parsedRows[0])

    return new Response(JSON.stringify(parsedRows), { status: 200 });
  } catch (error) {
    console.error("Error during query or parsing:", error); // Log the error that occurred
    return new Response(
      JSON.stringify({ error: "Failed to fetch questions" }),
      { status: 500 }
    );
  }
}
