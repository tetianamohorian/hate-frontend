import React from 'react';

const Historia = ({ history }) => {
  return (
    <div className="mt-8 max-h-64 overflow-y-auto bg-white/10 rounded-lg p-4 backdrop-blur-md shadow-inner space-y-3">
      {history.length === 0 ? (
        <p className="text-gray-400 text-center">Zatiaľ nie je žiadna história.</p>
      ) : (
        history.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:justify-between md:items-center bg-white/5 p-3 rounded-md hover:bg-white/10 transition"
          >
            <div className="text-white truncate max-w-[250px]">
              💬 {item.text}
            </div>
            <div className={`text-sm font-bold ${item.prediction === 'Pravdepodobne toxický' ? 'text-red-400' : 'text-green-400'} mt-2 md:mt-0`}>
              {item.prediction}
            </div>
            <div className="text-xs text-gray-400 mt-1 md:mt-0">
              {item.timestamp}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Historia;
