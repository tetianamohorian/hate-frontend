import React from 'react';

const Historia = ({ history }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto text-sm text-left text-gray-300">
        <thead className="text-xs uppercase text-gray-400 bg-white/10">
          <tr>
            <th scope="col" className="px-6 py-3">Text</th>
            <th scope="col" className="px-6 py-3">Výsledok</th>
            <th scope="col" className="px-6 py-3">Dátum</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition">
              <td className="px-6 py-2 max-w-[200px] truncate">{item.text}</td>
              <td className={`px-6 py-2 font-semibold ${item.prediction === 'Pravdepodobne toxický' ? 'text-red-400' : 'text-green-400'}`}>
                {item.prediction}
              </td>
              <td className="px-6 py-2 text-right">{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historia;
