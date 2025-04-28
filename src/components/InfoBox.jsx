import React, { useState, useEffect } from 'react';
import ChatInput from './ChatInput.jsx';
import Historia from './Historia.jsx';

const InfoBox = () => {
  const [headerText, setHeaderText] = useState('Analyzujte text na nenávistný jazyk');
  const [paragraphText, setParagraphText] = useState('Tento nástroj využíva umelú inteligenciu na identifikáciu toxického obsahu v textoch. Stačí zadať text a zistiť, či obsahuje nenávistný jazyk.');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchHistory = async () => {
    try {
      const response = await fetch("https://hate-backend-production.up.railway.app/api/history");
      const data = await response.json();
      setHistory(data.reverse());
    } catch (err) {
      console.error("Nepodarilo sa načítať históriu:", err);
    }
  };

  const handleSendMessage = async (userMessage) => {
    setHeaderText("Analyzujem text...");
    setParagraphText("Analyzujeme váš text, prosím čakajte...");
    setIsLoading(true); 
    const startTime = Date.now();
    
    try {
       const response = await fetch("https://hate-backend-production.up.railway.app/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userMessage }),
      });
      const data = await response.json();
      const elapsed = Date.now() - startTime;
      const minimumDelay = 5000;

      if (elapsed < minimumDelay) 
      {
      await new Promise(resolve => setTimeout(resolve, minimumDelay - elapsed));
      }
      
      if (response.ok) {
      setHeaderText(data.prediction);
      setParagraphText(`Váš text bol: "${userMessage}"`);
      fetchHistory();
    } else {
      console.error("Server vrátil chybu:", data.error);
    }
      
    } catch (error) {
      console.error("Chyba pri odosielaní:", error);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="info-container text-center w-full pb-16">
      <h2 className={isLoading ? "pulse" : ""}>{isLoading ? 'Analyzujem text...' : headerText}</h2>
      <p>{isLoading ? 'Prosím čakajte, prebieha analýza.' : paragraphText}</p>
      
      <div className="flex flex-col items-center w-full">
        <ChatInput onSubmit={handleSendMessage} />

      {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}
        {!isLoading && (
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            📑 {showHistory ? "Skryť históriu" : "Zobraziť históriu"}
          </button>
        )}

        {showHistory && !isLoading && (
          <div className="overflow-hidden transition-all duration-500 ease-in-out opacity-100 max-h-[500px] mt-6 w-full max-w-xl bg-white/5 p-4 rounded-lg shadow-inner backdrop-blur-md">
            <h3 className="text-white text-lg font-semibold text-center mb-4"
                style={{ backgroundColor: '#1A1A1A99', backdropFilter: 'blur(8px)', padding: '10px', borderRadius: '8px' }}>
              🕘 História analýz
            </h3>

            <Historia history={history} />
          </div>
        )}
       
      </div>
    </div>
  );
};

export default InfoBox;
