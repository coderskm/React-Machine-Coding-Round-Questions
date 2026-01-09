import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      let response = await fetch(`https://api.quotable.io/random`);
      if (!response.ok) {
        setError({ success: false, message: `error  while fetching data !!! ${response.status}` });
        return;
      }
      const quoteData = await response.json();
      setQuote(quoteData);
    } catch (error) {
      setError({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <>
      <div className="app-container">
        {loading && <p className="loading-state">LOADING ...</p>}
        {error && <p className="error-state">{error.message}</p>}
        {quote && !loading && !error && (
          <div className="quote-gen-container">
            <h1>REACT QUOTE GENERATOR</h1>
            <p className="quote-content">{quote.content}</p>
            <p className="quote-author"> - {quote.author}</p>
            <button onClick={fetchQuote}>FETCH NEW QUOTE</button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
