import { sql } from '@vercel/postgres';

export async function createTables() {
  await sql`
    CREATE TABLE IF NOT EXISTS questionnaire_questionnaires (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS questionnaire_questions (
      id SERIAL PRIMARY KEY,
      question JSONB NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS questionnaire_junction (
      id SERIAL PRIMARY KEY,
      question_id INT REFERENCES questionnaire_questions(id),
      questionnaire_id INT REFERENCES questionnaire_questionnaires(id),
      priority INT NOT NULL
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS user_answers (
      id SERIAL PRIMARY KEY,
      user_id INT,
      question_id INT REFERENCES questionnaire_questions(id),
      answer TEXT
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL
    );
  `;
}