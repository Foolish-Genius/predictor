import InputForm from './components/InputForm';

function App() {
  const handlePrediction = ({ exam, value }) => {
    console.log('Predicting for:', exam, value);
    // Later: send to backend or ML model
  };

  return (
    <div className="min-h-screen bg-[#011425] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-[#5c7c89] mb-6">Cutoff Predictor</h1>
      <InputForm onSubmit={handlePrediction} />
    </div>
  );
}

export default App;
