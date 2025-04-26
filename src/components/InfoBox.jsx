import React, { useState, useEffect } from 'react';
import ChatInput from './ChatInput.jsx';
import Historia from './Historia.jsx';

const InfoBox = () => {
  const [headerText, setHeaderText] = useState('Analyzujte text na nenávistný jazyk');
  const [paragraphText, setParagraphText] = useState('Tento nástroj využíva umelú inteligenciu na identifikáciu toxického obsahu v textoch. Stačí zadať text a zistiť, či obsahuje nenávistný jazyk.');
  const [history, setHistory] = useState([]);

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
      fetchHistory(); // Obnovíme históriu
    } catch (error) {
      console.error("Chyba pri odosielaní:", error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="info-container text-center">
      <h2>{headerText}</h2>
      <p>{paragraphText}</p>

      {/* Input na odosielanie */}
      <div className="flex flex-col items-center">
        <ChatInput onSubmit={handleSendMessage} />


        <div className="w-full px-4">
          <div className="mt-8 w-full">
            <div className="bg-white/5 rounded-lg p-4 backdrop-blur-md shadow-inner w-full" style={{ maxHeight: "300px", overflowY: "auto" }}>
                <Historia history={history} />
            </div>
          </div>
        </div>
      </div>


      
    </div>
  );
};

export default InfoBox;
