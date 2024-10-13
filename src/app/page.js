export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-10 shadow-md rounded-lg">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to the Health Questionnaire Platform
        </h1>
        <p className="text-gray-600 mb-8">
          Easily track your health data and stay connected with your provider.
        </p>
        <a
          href="/login"
          className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-600"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
