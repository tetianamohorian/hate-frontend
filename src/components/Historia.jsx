import React from 'react';

const Historia = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="text-gray-400 text-center">
        Zatiaľ neexistuje žiadna história analýz.
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[200px] overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
      {history.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center bg-white/5 hover:bg-white/10 transition p-2 rounded-md"
        >
          <span className="truncate max-w-[30%] text-white text-sm">{item.text}</span>
          <span className={`text-sm ${item.prediction === 'Pravdepodobne toxický' ? 'text-red-400' : 'text-green-400'}`}>
            {item.prediction}
          </span>
          <span className="text-xs text-gray-400 text-right">{item.timestamp}</span>
        </div>
      ))}
    </div>
  );
};

export default Historia;
