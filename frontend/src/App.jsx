// App.jsx
import { useState } from "react";
import axios from "axios";
import InputForm from "./components/InputForm";

function App() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const supportedExams = ["bitsat"];

  const handlePrediction = async ({ exam, value }) => {
    setError("");
    setResults([]);

    if (!supportedExams.includes(exam)) {
      setError(`${exam.toUpperCase()} is not supported yet.`);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/eligible-courses", {
        score: value,
      });
      setResults(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const renderCourseCard = (course, i) => (
    <div key={i} className="p-3 border border-gray-600 rounded-md bg-[#244b5c]">
      <p className="font-medium">{course.program}</p>
      <p className="text-sm text-gray-300">
        {course.campus} | Cutoff: {course.cutoff}
      </p>
    </div>
  );

  return (
    <div className="w-screen h-screen sm:overflow-hidden overflow-auto flex flex-col sm:flex-row bg-[#000] text-white">
      <div className="w-[32vw] bg-[#011425] text-white flex flex-col items-center justify-center p-6">
        <div className="space-y-6 w-full">
          <h1 className="text-4xl font-bold text-[#fff] text-center">
            Cutoff Predictor
          </h1>
          <InputForm onSubmit={handlePrediction} />
          {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
        </div>
      </div>

      <div className="w-full sm:flex-1 sm:h-full sm:overflow-y-auto p-6 bg-[#072c3c]">
        {loading && <p className="text-center text-gray-400">Fetching results...</p>}

        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {results.map(renderCourseCard)}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
