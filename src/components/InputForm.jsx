import { useState } from 'react';

function InputForm({ onSubmit }) {
  const [exam, setExam] = useState('jee_mains');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ exam, value });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#011425] p-6 rounded-lg shadow-md max-w-md mx-auto">
      <label className="block text-white mb-2">Select Exam:</label>
      <select
        value={exam}
        onChange={(e) => setExam(e.target.value)}
        className="w-full p-2 rounded bg-[#1f4959] text-white mb-4"
      >
        <option value="jee_mains">JEE Mains</option>
        <option value="jee_advanced">JEE Advanced</option>
        <option value="bitsat">BITSAT</option>
      </select>

      <label className="block text-white mb-2">Enter Score/Rank:</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 rounded bg-[#1f4959] text-white mb-4"
        placeholder="e.g. 1234"
      />

      <button type="submit" className="bg-[#5c7c89] text-white px-4 py-2 rounded hover:bg-[#4a6b78]">
        Predict Cutoffs
      </button>
    </form>
  );
}

export default InputForm;
