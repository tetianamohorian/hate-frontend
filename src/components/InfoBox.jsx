import React, { useState, useEffect } from 'react';
import ChatInput from './ChatInput.jsx';

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

  const handleSendMessage = (userMessage, serverResponse) => {
    setHeaderText(serverResponse);
    setParagraphText(`Váš text bol: "${userMessage}"`);
    fetchHistory();
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="info-container">
      <h2>{headerText}</h2>
      <p>{paragraphText}</p>

      <ChatInput onSubmit={handleSendMessage} />

     
    </div>
  );
};

export default InfoBox;
