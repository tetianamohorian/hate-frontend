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

      {history.length > 0 && (
        <div className="mt-10 bg-white/5 p-5 rounded-xl backdrop-blur-md max-w-3xl mx-auto shadow-inner">
          <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
            <span className="text-xl">🕘</span> História analýz
          </h3>

          {/* Scrollovateľná tabuľka */}
          <div className="max-h-[230px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <table className="w-full text-sm text-left text-gray-300 table-auto">
              <thead className="sticky top-0 bg-black/40 backdrop-blur-sm text-gray-400 text-xs uppercase">
                <tr>
                  <th className="px-4 py-2 font-medium">Text</th>
                  <th className="px-4 py-2 font-medium">Výsledok</th>
                  <th className="px-4 py-2 font-medium">Dátum</th>
                </tr>
              </thead>
              <tbody>
                {history.slice(0, 20).map((item, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="px-4 py-2 truncate max-w-[200px]">{item.text}</td>
                    <td className={`px-4 py-2 font-medium ${item.prediction === 'Pravdepodobne toxický' ? 'text-red-400' : 'text-green-400'}`}>
                      {item.prediction}
                    </td>
                    <td className="px-4 py-2 text-xs text-gray-400">{item.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBox;
