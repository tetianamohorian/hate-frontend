import React from 'react';

const Historia = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="text-center text-gray-400 py-4">
        Zatiaľ neexistuje žiadna história analýz.
      </div>
    );
  }

  return (
    <div className="text-gray-300 text-sm">
      {history.map((item, index) => (
        <div key={index} className="border-b border-gray-700 last:border-0">
          <div className="py-2 px-4 flex flex-col">
            <div className="flex justify-between items-center mb-1">
              <div className="truncate max-w-xs">{item.text}</div>
              <div className={`ml-2 font-medium ${item.prediction.includes('toxický') ? 'text-red-400' : 'text-green-400'}`}>
                {item.prediction}
              </div>
            </div>
            <div className="text-xs text-gray-400 text-right">
              {item.timestamp}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Historia;
