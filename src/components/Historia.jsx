import React from 'react';

const Historia = ({ history }) => {
  if (!history || history.length === 0) {
    return <p className="text-center text-gray-400">Zatiaľ žiadna história</p>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full table-auto text-sm text-gray-300">
        <tbody>
          {history.map((item, index) => (
            <tr 
              key={index} 
              className={index % 2 === 0 ? "bg-gray-800/40" : "bg-gray-800/40"}
            >
              <td className="py-3 px-4 text-center text-white w-1/3">{item.text}</td>
              <td className="py-3 px-4 text-center w-1/3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  item.prediction.includes("toxický") 
                    ? "bg-red-500/40 text-red-100" 
                    : "bg-green-500/40 text-green-100"
                }`}>
                  {item.prediction}
                </span>
              </td>
              <td className="py-3 px-4 text-center text-gray-400 text-sm w-1/3">
                {formatDateTime(item.timestamp)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historia;
