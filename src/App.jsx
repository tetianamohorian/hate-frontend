import React from 'react';
import Header from './components/Header';
import InfoBox from './components/InfoBox';
import Historia from './components/Historia';
import Footer from './components/Footer';

import './App.css';

const App = () => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await fetch("https://hate-backend-production.up.railway.app/api/history");
      const data = await response.json();
      setHistory(data.reverse());
    } catch (error) {
      console.error("Chyba pri načítaní histórie:", error);
    }
  };

  useEffect(() => {
    fetchHistory(); // načítaj históriu hneď po načítaní stránky
  }, []);
  
  const handleSendMessage = async (userMessage) => {
  console.log('Отправлено сообщение:', userMessage);
  try {
    const response = await fetch("https://hate-backend-production.up.railway.app/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: userMessage }),
    });

    const data = await response.json();
    console.log('Výsledok predikcie:', data.prediction);

    fetchHistory(); // obnovíme históriu po úspešnom odoslaní
  } catch (error) {
    console.error("Chyba pri odosielaní správy:", error);
  }
};

  return (
    <div className="app-container">
      <Header />
      <InfoBox />
      <Historia history={history} />
      <Footer />

    </div>
  );
};

export default App; 
