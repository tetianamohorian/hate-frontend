import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [prediction, setPrediction] = useState('');
  const [submittedText, setSubmittedText] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPrediction('');
    
    console.log("Formulár bol odoslaný!", input); // Добавили лог
    
    if (input.trim()) {
      try {
      const response = await fetch("https://hate-backend-production.up.railway.app/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await response.json();
     
      if (!response.ok) 
      {
          setError(data.error || "Chyba pri analýze textu.");
          return;
      }
      setPrediction(data.prediction);
      setSubmittedText(input);
      setInput('');
    }  catch (error) {
      console.error("Ошибка запроса:", error);
      alert("Chyba pri analýze textu!");
    }
    }
    else {
      setError("Text nesmie byť prázdny.");
    }
  };


  return (
    <div className="input-container">
      {error ? (
        <h2 className="text-yellow-400 text-xl font-semibold mb-4">⚠️ {error}</h2>
      ) : prediction ? (
        <>
          <h1 className="text-white text-4xl font-bold mb-4">{prediction}</h1>
          <p className="text-gray-300 text-xl">Váš text bol: "{submittedText}"</p>
        </>
      ) : null}
      <form onSubmit={handleSubmit} className="input-wrapper">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Zadajte text na analýzu"
          className="text-input"
        />
        <button type="submit" className="submit-button">
          <Send size={24} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
