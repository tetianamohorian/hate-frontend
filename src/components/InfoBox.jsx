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
    console.log('Отправлено сообщение:', userMessage);
    console.log('Ответ от сервера:', serverResponse);

    setHeaderText(serverResponse); // В заголовок пишем ответ от сервера
    setParagraphText(`Váš text bol: "${userMessage}"`);// В параграф пишем сообщение пользователя
    fetchHistory();
  };

 useEffect(() => {
    fetchHistory(); // načítaj históriu pri štarte
  }, []);
  
 return  (

  

  <div className="info-container">
    <h2>{headerText}</h2>
    <p>{paragraphText}</p>

    <ChatInput onSubmit={handleSendMessage} /> {}
  {history.length > 0 && (
  <div className="mt-10 bg-white/5 p-5 rounded-xl backdrop-blur-md max-w-xl mx-auto shadow-inner">
    <h3 className="text-white text-lg font-semibold mb-4 text-center">🕘 História analýz</h3>

    <div className="max-h-80 overflow-y-auto pr-2">
      <ul className="space-y-3 text-sm text-gray-300 list-none">
        {history.slice(0, 15).map((item, index) => (
          <li
            key={index}
            className="bg-white/10 px-4 py-2 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center"
          >
            <span className="truncate max-w-full md:max-w-[50%]">
              💬 <span className="text-white">{item.text}</span>
            </span>

            <span
              className={`font-medium mt-1 md:mt-0 ${
                item.prediction === 'Pravdepodobne toxický'
                  ? 'text-red-400'
                  : 'text-green-400'
              }`}
            >
              {item.prediction}
            </span>

            <span className="text-xs text-gray-400 mt-1 md:mt-0">{item.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
)}

export default InfoBox;
