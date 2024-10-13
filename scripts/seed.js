// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { sql } = require('@vercel/postgres');

// Seed questionnaires
async function seedQuestionnaires() {
  const filePath = path.join(process.cwd(), 'seeding_data', 'Questionaire Types.csv');
  return new Promise((resolve, reject) => {
    const questionnaires = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => questionnaires.push(row))
      .on('end', async () => {
        try {
          for (const row of questionnaires) {
            // Remove id and only insert the name
            await sql`
              INSERT INTO questionnaire_questionnaires (name)
              VALUES (${row.name});
            `;
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      });
  });
}

// Seed questions
async function seedQuestions() {
  const filePath = path.join(process.cwd(), 'seeding_data', 'Questions.csv');
  return new Promise((resolve, reject) => {
    const questions = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => questions.push(row))
      .on('end', async () => {
        try {
          for (const row of questions) {
            // Remove id and only insert the question
            await sql`
              INSERT INTO questionnaire_questions (question)
              VALUES (${JSON.stringify(row)});
            `;
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      });
  });
}

// Seed junctions (links questions to questionnaires)
async function seedJunctions() {
  const filePath = path.join(process.cwd(), 'seeding_data', 'Questions to Questionaires.csv');
  return new Promise((resolve, reject) => {
    const junctions = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => junctions.push(row))
      .on('end', async () => {
        try {
          for (const row of junctions) {
            // Remove id and only insert question_id, questionnaire_id, and priority
            await sql`
              INSERT INTO questionnaire_junction (question_id, questionnaire_id, priority)
              VALUES (${row.question_id}, ${row.questionnaire_id}, ${row.priority});
            `;
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      });
  });
}

// Main function to seed all data
(async () => {
  try {
    await seedQuestionnaires();
    await seedQuestions();
    await seedJunctions();
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
})();
