import React from 'react';

const Historia = ({ history }) => {
  if (!history || history.length === 0) {
    return <p className="text-center text-gray-400">Zatiaľ žiadna história</p>;
  }

  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-2 px-3 text-left text-gray-300">Text</th>
            <th className="py-2 px-3 text-center text-gray-300">Výsledok</th>
            <th className="py-2 px-3 text-right text-gray-300">Dátum</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr 
              key={index} 
              className={index % 2 === 0 ? "bg-gray-800/40" : "bg-gray-800/20"}
            >
              <td className="py-2 px-3 text-left text-white">{item.text}</td>
              <td className="py-2 px-3 text-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.prediction.includes("toxický") 
                    ? "bg-red-500/40 text-red-100" 
                    : "bg-green-500/40 text-green-100"
                }`}>
                  {item.prediction}
                </span>
              </td>
              <td className="py-2 px-3 text-right text-gray-400 text-sm">
                {new Date(item.timestamp).toLocaleString('sk-SK')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historia;
