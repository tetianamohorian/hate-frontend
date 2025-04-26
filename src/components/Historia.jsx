import React from 'react';

const Historia = ({ history = [] }) => {
  return (
    <div className="mt-10 bg-white/5 p-6 rounded-2xl backdrop-blur-xl max-w-4xl mx-auto shadow-md border border-white/10">
      <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-xl">🕘</span> História analýz
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300 table-auto">
          <thead className="sticky top-0 bg-black/30 backdrop-blur-sm text-gray-400 text-xs uppercase">
            <tr>
              <th className="px-4 py-2">Text</th>
              <th className="px-4 py-2">Výsledok</th>
              <th className="px-4 py-2">Dátum</th>
            </tr>
          </thead>
          <tbody className="max-h-[220px] overflow-y-auto block">
            {history.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center text-gray-400 py-4">Žiadne záznamy.</td>
              </tr>
            ) : (
              history.slice(0, 50).map((item, index) => (
                <tr key={index} className="border-b border-white/10 hover:bg-white/10 transition">
                  <td className="px-4 py-3 truncate max-w-[220px]">{item.text}</td>
                  <td className={`px-4 py-3 font-semibold ${item.prediction === 'Pravdepodobne toxický' ? 'text-red-400' : 'text-green-400'}`}>
                    {item.prediction}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{item.timestamp}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historia;
