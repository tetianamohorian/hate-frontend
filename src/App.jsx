import React from 'react';
import Header from './components/Header';
import InfoBox from './components/InfoBox';
import Footer from './components/Footer';

import './App.css';

const App = () => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await fetch("https://hate-backend-production.up.railway.app/api/history");
      const data = await response.json();
      setHistory(data.reverse());
    } catch (err) {
      console.error("Chyba pri načítaní histórie:", err);
    }
  };

  useEffect(() => {
    fetchHistory(); // načítame pri načítaní aplikácie
  }, []);

  const handleSubmit = () => {
    fetchHistory(); // obnovíme históriu po odoslaní
  };
  
  const handleSendMessage = (message) => {
    console.log('Отправлено сообщение:', message);
  };

  return (
    <div className="app-container">
      <Header />
      <InfoBox /> 
      {/* ChatInput s predikciou */}
      <div className="mt-8 flex justify-center">
        <ChatInput onSubmit={handleSubmit} />
      </div>

      {/* História */}
      {history.length > 0 && (
        <div className="mt-12 bg-white/5 p-6 rounded-xl backdrop-blur-md max-w-xl mx-auto
                        max-h-80 overflow-y-auto shadow-lg">
          <h3 className="text-white text-lg font-semibold mb-4 text-center">🕘 História analýz</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            {history.slice(0, 10).map((item, index) => (
              <li key={index} className="bg-white/10 px-4 py-2 rounded-lg flex flex-col md:flex-row md:justify-between md:items-center">
                <span className="truncate max-w-full md:max-w-[60%]">💬 {item.text}</span>
                <span className={`font-medium mt-1 md:mt-0 ${item.prediction === "Pravdepodobne toxický" ? "text-red-400" : "text-green-400"}`}>
                  {item.prediction}
                </span>
                <span className="text-xs text-gray-400 mt-1 md:mt-0">{item.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Footer />

    </div>
  );
};

export default App;
