import React from 'react';

const Historia = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-4">
        Zatiaľ neexistuje žiadna história analýz.
      </div>
    );
  }

  return (
    <div className="overflow-y-auto max-h-48 w-full">
      <table className="w-full table-auto text-sm text-left text-gray-300">
        <thead className="text-xs uppercase text-gray-400 bg-white/10">
          <tr>
            <th scope="col" className="px-4 py-2">Text</th>
            <th scope="col" className="px-4 py-2">Výsledok</th>
            <th scope="col" className="px-4 py-2 text-right">Dátum</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr
              key={index}
              className="border-b border-white/10 hover:bg-white/5 transition duration-200 ease-in-out"
            >
              <td className="px-4 py-2 truncate max-w-xs">{item.text}</td>
              <td className={`px-4 py-2 ${item.prediction === 'Pravdepodobne toxický' ? 'text-red-400 font-semibold' : 'text-green-400 font-semibold'}`}>
                {item.prediction}
              </td>
              <td className="px-4 py-2 text-right">{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historia;
