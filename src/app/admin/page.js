'use client';

import { useEffect, useState } from 'react';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const viewAnswers = (userId) => {
    fetch(`/api/admin/userAnswers?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedUser(users.find((u) => u.id === userId));
        setAnswers(data);
        setShowModal(true);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <ul className="w-full max-w-md bg-white p-4 shadow-md rounded-lg">
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => viewAnswers(user.id)}
            className="p-4 border-b hover:bg-gray-100 cursor-pointer"
          >
            {user.username} - {user.questionnairesCompleted} questionnaires completed
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Answers for {selectedUser.username}</h2>
            <ul>
              {answers.map((answer) => (
                <li key={answer.questionId} className="mb-2">
                  <strong>Q: {answer.questionText}</strong> <br />
                  A: {answer.answer}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal {
          position: fixed;
          z-index: 50;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .modal-content {
          max-width: 500px;
        }
      `}</style>
    </div>
  );
}
