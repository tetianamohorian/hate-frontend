import React from 'react';

const Historia = ({ history = [] }) => {
  return (
    <table className="w-full text-sm text-left text-gray-300">
      <thead className="sticky top-0 bg-black/30 backdrop-blur-sm text-gray-400 text-xs uppercase">
        <tr>
          <th className="px-4 py-2">Text</th>
          <th className="px-4 py-2">Výsledok</th>
          <th className="px-4 py-2">Dátum</th>
        </tr>
      </thead>
      <tbody>
        {history.length === 0 ? (
          <tr>
            <td colSpan="3" className="text-center py-4 text-gray-400">Žiadne záznamy.</td>
          </tr>
        ) : (
          history.slice(0, 50).map((item, index) => (
            <tr key={index} className="hover:bg-white/10 transition">
              <td className="px-4 py-2 truncate max-w-[200px]">{item.text}</td>
              <td className={`px-4 py-2 font-semibold ${item.prediction === 'Pravdepodobne toxický' ? 'text-red-400' : 'text-green-400'}`}>
                {item.prediction}
              </td>
              <td className="px-4 py-2 text-xs text-gray-400 whitespace-nowrap">{item.timestamp}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Historia;
