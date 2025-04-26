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
    <div className="w-full bg-white/5 rounded-lg p-4 backdrop-blur-md shadow-inner" style={{ maxHeight: "300px", overflowY: "auto" }}>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-full table-auto text-sm text-left text-gray-300">
          <thead className="text-xs uppercase text-gray-400 bg-white/10">
            <tr>
              <th className="px-6 py-3">Text</th>
              <th className="px-6 py-3">Výsledok</th>
              <th className="px-6 py-3 text-right">Dátum</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition">
                <td className="px-6 py-3 truncate max-w-xs">{item.text}</td>
                <td className={`px-6 py-3 ${item.prediction === 'Pravdepodobne toxický' ? 'text-red-400 font-semibold' : 'text-green-400 font-semibold'}`}>
                  {item.prediction}
                </td>
                <td className="px-6 py-3 text-right">{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historia;
