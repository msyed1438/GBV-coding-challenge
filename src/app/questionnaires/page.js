"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Questionnaires() {
  const [questionnaires, setQuestionnaires] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  useEffect(() => {
    fetch("/api/questionnaires")
      .then((res) => res.json())
      .then(setQuestionnaires);
  }, []);

  const handleSelect = (id) => {
    router.push(`/questionnaires/${id}?userId=${userId}`);
  };

  return (
    <Suspense>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
        <h1 className="text-3xl font-bold mb-6">Select a Questionnaire</h1>
        <ul className="w-full max-w-md bg-white p-4 shadow-md rounded-lg">
          {questionnaires.map((q) => (
            <li
              key={q.id}
              onClick={() => handleSelect(q.id)}
              className="p-4 border-b hover:bg-gray-100 cursor-pointer"
            >
              {q.name}
            </li>
          ))}
        </ul>
      </div>
    </Suspense>
  );
}
