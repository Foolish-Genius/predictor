import axios from 'axios';
import { useState } from 'react';

function ScoreForm() {
  const [score, setScore] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');
    try {
      const res = await axios.post('http://localhost:3000/api/eligible-courses', {
        score: Number(score)
      });
      setResults(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong.');
      setResults([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter your BITSAT score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button type="submit">Check Eligible Courses</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {results.length > 0 && (
        <ul>
          {results.map((course, index) => (
            <li key={index}>
              {course.program} @ {course.campus} — Cutoff: {course.cutoff}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ScoreForm;
