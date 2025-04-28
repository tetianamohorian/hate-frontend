import React from 'react';

const Historia = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="text-center text-gray-400">
        Zatiaľ neexistuje žiadna história analýz.
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/10 text-gray-300 text-sm">
      {history.map((item, index) => (
        <div key={index} className="py-2 flex justify-between items-center">
          <div className="truncate">{item.text}</div>
          <div className={`font-semibold ${item.prediction.includes('toxický') ? 'text-red-400' : 'text-green-400'}`}>
            {item.prediction}
          </div>
          <div className="text-right text-xs text-gray-400 ml-2 whitespace-nowrap">{item.timestamp}</div>
        </div>
      ))}
    </div>
  );
};

export default Historia;
