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
      {/* Заголовок строки */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr', 
        width: '100%',
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
      }} className="text-xs uppercase text-gray-400">
        <div className="px-4 py-3">Text</div>
        <div className="px-4 py-3">Výsledok</div>
        <div className="px-4 py-3 text-right">Dátum</div>
      </div>

      {/* Строки данных */}
      {history.map((item, index) => (
        <div key={index} style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr', 
          width: '100%',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }} className="hover:bg-white/5 transition">
          <div className="px-4 py-3 truncate">{item.text}</div>
          <div className={`px-4 py-3 ${item.prediction === 'Pravdepodobne toxický' ? 'text-red-400 font-semibold' : 'text-green-400 font-semibold'}`}>
            {item.prediction}
          </div>
          <div className="px-4 py-3 text-right">{item.timestamp}</div>
        </div>
      ))}
    </div>
  );
};

export default Historia;
