import React, { useState, useEffect } from 'react';
import ChatInput from './ChatInput.jsx';
import Historia from './Historia.jsx';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
      
      if (elapsed < minimumDelay) {
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
    } finally {
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
        
        <div className="w-full max-w-2xl mt-8">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex justify-center items-center w-full bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded transition duration-300 focus:outline-none"
          >
            <span className="mr-2">História analýz</span>
            {showHistory ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          
          {showHistory && (
            <div className="mt-2 bg-gray-900 bg-opacity-80 backdrop-blur-md rounded overflow-hidden">
              <div className="max-h-40 overflow-y-auto">
                <Historia history={history} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
