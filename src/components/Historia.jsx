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

  // Ограничиваем количество отображаемых записей до 5
  const limitedHistory = history.slice(0, 5);

  return (
    <div className="w-full bg-white/5 rounded-lg backdrop-blur-md shadow-inner" style={{ height: "250px", overflowY: "auto" }}>
      <table className="w-full table-fixed text-sm text-left text-gray-300" style={{ tableLayout: "fixed" }}>
        <thead className="text-xs uppercase text-gray-400 bg-white/10 sticky top-0">
          <tr>
            <th className="px-4 py-3 w-1/3">Text</th>
            <th className="px-4 py-3 w-1/3">Výsledok</th>
            <th className="px-4 py-3 w-1/3 text-right">Dátum</th>
          </tr>
        </thead>
        <tbody>
          {limitedHistory.map((item, index) => (
            <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition">
              <td className="px-4 py-3 truncate">{item.text}</td>
              <td className={`px-4 py-3 ${item.prediction === 'Pravdepodobne toxický' ? 'text-red-400 font-semibold' : 'text-green-400 font-semibold'}`}>
                {item.prediction}
              </td>
              <td className="px-4 py-3 text-right">{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historia;
