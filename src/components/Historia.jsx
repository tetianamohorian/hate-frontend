// Historia.jsx
import React from 'react';

const Historia = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="text-center text-gray-400 p-4 bg-white/5 rounded-lg backdrop-blur-md shadow-inner w-full">
        Zatiaľ neexistuje žiadna história analýz.
      </div>
    );
  }

  return (
    <div className="w-full bg-white/5 rounded-lg backdrop-blur-md shadow-inner" style={{ height: "300px", overflowY: "auto" }}>
      {/* Заголовок */}
      <div className="flex w-full text-xs uppercase text-gray-400 bg-white/10 sticky top-0">
        <div className="flex-1 px-4 py-3">Text</div>
        <div className="flex-1 px-4 py-3">Výsledok</div>
        <div className="flex-1 px-4 py-3 text-right">Dátum</div>
      </div>
      
      {/* Данные */}
      {history.map((item, index) => (
        <div key={index} className="flex w-full border-b border-white/10 hover:bg-white/5 transition">
          <div className="flex-1 px-4 py-3 truncate">{item.text}</div>
          <div className={`flex-1 px-4 py-3 ${item.prediction === 'Pravdepodobne toxický' ? 'text-red-400 font-semibold' : 'text-green-400 font-semibold'}`}>
            {item.prediction}
          </div>
          <div className="flex-1 px-4 py-3 text-right">{item.timestamp}</div>
        </div>
      ))}
    </div>
  );
};

export default Historia;
