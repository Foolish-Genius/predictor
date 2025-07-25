import { useState } from "react";
import axios from "axios";
import InputForm from "./components/InputForm";

function App() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handlePrediction = async ({ exam, value }) => {
    setError("");
    setResults([]);

    if (exam !== "bitsat") {
      setError("Only BITSAT is supported right now.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/eligible-courses",
        {
          score: value,
        }
      );
      setResults(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  const mid = Math.ceil(results.length / 2);
  const leftColumn = results.slice(0, mid);
  const rightColumn = results.slice(mid);

  return (
    <div className="w-screen h-screen sm:overflow-hidden overflow-auto flex flex-col sm:flex-row bg-[#011425] text-white">

      <div className="w-full sm:w-[400px] sm:h-full flex items-center justify-center p-6 bg-[#021c2e]">
        <div className="space-y-6 w-full">
          <h1 className="text-4xl font-bold text-[#ffffff] text-center">
            Cutoff Predictor
          </h1>
          <InputForm onSubmit={handlePrediction} />
          {error && (
            <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
          )}
        </div>
      </div>

      <div className="w-full sm:flex-1 sm:h-full sm:overflow-y-auto p-6 bg-[#072c3c]">
        {results.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {leftColumn.map((course, i) => (
              <div
                key={i}
                className="p-3 border border-gray-600 rounded-md bg-[#244b5c]"
              >
                <p className="font-medium">{course.program}</p>
                <p className="text-sm text-gray-300">
                  {course.campus} | Cutoff: {course.cutoff}
                </p>
              </div>
            ))}

            {rightColumn.map((course, i) => (
              <div
                key={i}
                className="p-3 border border-gray-600 rounded-md bg-[#244b5c]"
              >
                <p className="font-medium">{course.program}</p>
                <p className="text-sm text-gray-300">
                  {course.campus} | Cutoff: {course.cutoff}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
