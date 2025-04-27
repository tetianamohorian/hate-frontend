import React, { useState, useEffect } from 'react';
import ChatInput from './ChatInput.jsx';
import Historia from './Historia.jsx';

const InfoBox = () => {
  const [headerText, setHeaderText] = useState('Analyzujte text na nenávistný jazyk');
  const [paragraphText, setParagraphText] = useState('Tento nástroj využíva umelú inteligenciu na identifikáciu toxického obsahu v textoch. Stačí zadať text a zistiť, či obsahuje nenávistný jazyk.');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
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
    try {
      await fetch("https://hate-backend-production.up.railway.app/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userMessage }),
      });
      fetchHistory();
    } catch (error) {
      console.error("Chyba pri odosielaní:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="info-container text-center w-full pb-16">
      <h2>{headerText}</h2>
      <p>{paragraphText}</p>
      
      <div className="flex flex-col items-center w-full">
        <ChatInput onSubmit={handleSendMessage} />
        {!showHistory && (
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="mt-10 mb-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            📑 Zobraziť históriu
          </button>

        )}

        
        {showHistory && (
          <>
            <h3 className="text-left text-white text-lg font-semibold mt-8 mb-4"
                style={{ backgroundColor: '#1A1A1A99', backdropFilter: 'blur(8px)', padding: '10px', borderRadius: '8px' }}>
              🕘 História analýz
            </h3>

            <div className="w-full mt-6 max-w-full mb-8">
              <Historia history={history} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InfoBox;
