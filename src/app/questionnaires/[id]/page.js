"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";

export default function QuestionnairePage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const questionnaireId = params.id;
  const userId = searchParams.get("userId");

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `/api/questions/${questionnaireId}?userId=${userId}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await res.json();

        // Set existing answers if they are present
        const existingAnswers = {};
        data.forEach((question) => {
          if (question.answer !== null) {
            existingAnswers[question.id] = question.answer;
          }
        });

        setQuestions(data);
        setAnswers(existingAnswers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (questionnaireId) {
      fetchQuestions();
    }
  }, [questionnaireId, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedAnswers = Object.keys(answers).map((questionId) => ({
      questionId,
      answer: answers[questionId],
    }));

    try {
      const res = await fetch("/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          questionnaireId,
          answers: formattedAnswers,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit answers");
      }

      console.log("Answers submitted successfully");
      
      // Redirect with userId in the URL
      window.location.href = `/questionnaires?userId=${userId}`;
      
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Answer the Questions</h1>
      <form
        className="w-full max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg"
        onSubmit={handleSubmit}
      >
        {questions.map(({ id, question }) => {
          const { type, question: questionText, options } = question.question;
          return (
            <div key={id} className="mb-4">
              <label className="block font-medium mb-2">{questionText}</label>
              {type === "mcq" ? (
                <select
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  onChange={(e) => handleChange(id, e.target.value)}
                  value={answers[id] || ""}
                >
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="block w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Your answer"
                  value={answers[id] || ""}
                  onChange={(e) => handleChange(id, e.target.value)}
                />
              )}
            </div>
          );
        })}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
