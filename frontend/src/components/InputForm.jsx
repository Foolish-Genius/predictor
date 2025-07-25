import { useState } from "react";
import { FaRocket, FaUniversity } from "react-icons/fa";

function InputForm({ onSubmit }) {
  const [exam, setExam] = useState("jee_mains");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const inputLabel = {
    jee_mains: "Enter JEE Mains Rank",
    jee_advanced: "Enter JEE Advanced Rank",
    bitsat: "Enter BITSAT Score",
  };

  const inputPlaceholder = {
    jee_mains: "e.g. 1234",
    jee_advanced: "e.g. 456",
    bitsat: "e.g. 320",
  };

  const isValidInput = () => {
    const num = Number(value);
    if (isNaN(num) || num <= 0) return false;

    if (exam === "bitsat" && num > 450) return false;
    if (exam === "jee_mains" && num > 1000000) return false;
    if (exam === "jee_advanced" && num > 200000) return false;

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidInput()) {
      setError("Please enter a valid score or rank.");
      return;
    }

    setError("");
    onSubmit({ exam, value: Number(value) });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#011425] p-8 rounded-xl shadow-xl max-w-md w-full space-y-6 transition-all duration-300"
    >
      <div className="space-y-2">
        <label htmlFor="exam" className="block text-sm font-medium text-white">
          Select Exam
        </label>
        <div className="relative">
          <FaUniversity className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg pointer-events-none" />
          <select
            id="exam"
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            className="w-full pl-10 p-3 rounded-lg bg-[#1f4959] text-white focus:outline-none focus:ring-2 focus:ring-[#5c7c89] transition"
          >
            <option value="jee_mains">JEE Mains</option>
            <option value="jee_advanced">JEE Advanced</option>
            <option value="bitsat">BITSAT</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="score" className="block text-sm font-medium text-white">
          {inputLabel[exam]}
        </label>
        <input
          id="score"
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-describedby={error ? "score-error" : undefined}
          className={`w-full p-3 rounded-lg bg-[#1f4959] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5c7c89] transition ${
            error ? "ring-2 ring-red-400" : ""
          }`}
          placeholder={inputPlaceholder[exam]}
        />
        {error && (
          <p id="score-error" className="text-red-400 text-sm animate-pulse">
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-[#ffffff] text-[#011425] px-4 py-3 rounded-lg hover:bg-[#ffffff] transition flex items-center justify-center gap-2 font-semibold"
      >
        <FaRocket className="text-[#011425] text-lg" />
        Predict Cutoffs
      </button>
    </form>
  );
}

export default InputForm;
