import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    console.log("Formulár bol odoslaný!", input); // Добавили лог
    
    if (input.trim()) {
      try {
      const response = await fetch("https://hate-backend-production.up.railway.app/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await response.json();
      //alert(`Výsledok analýzy: ${data.prediction}`);
      if (!response.ok) 
      {
          setError(data.error || "Chyba pri analýze textu.");
          return;
      }
      if (onSubmit) 
      {
        onSubmit(input, data.prediction);
      }
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
       {error && (
        <div className="mt-4 text-red-500 font-semibold text-center">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
