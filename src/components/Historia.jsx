import React from 'react';

const History = ({ history = [] }) => {
  return (
    <div className="mt-10 bg-white/5 p-6 rounded-2xl backdrop-blur-xl max-w-2xl mx-auto shadow-md border border-white/10">
      <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
        <span className="text-xl">🧾</span> História analýz
      </h3>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scroll">
        {history.slice(0, 50).map((item, index) => (
          <div
            key={index}
            className="bg-white/10 hover:bg-white/20 transition duration-200 px-4 py-3 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center"
          >
            <div className="text-white font-medium flex-1 truncate">
              💬 {item.text}
            </div>
            <div
              className={`font-semibold text-sm mt-2 md:mt-0 md:text-right ${
                item.prediction === 'Pravdepodobne toxický'
                  ? 'text-red-400'
                  : 'text-green-400'
              }`}
            >
              {item.prediction}
            </div>
            <div className="text-xs text-gray-400 mt-1 md:mt-0 md:ml-4 whitespace-nowrap">
              {item.timestamp}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
