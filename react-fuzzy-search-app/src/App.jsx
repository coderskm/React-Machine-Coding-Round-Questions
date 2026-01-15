import { useEffect, useState } from "react";
import "./App.css";
import Coincard from "./components/Coincard";

function App() {
  const [coinsList, setCoinsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");

  const url = import.meta.env.VITE_API_URL;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": import.meta.env.VITE_API_TOKEN,
    },
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url, options);
        if (!response.ok) {
          setError({ status: false, message: `Error occurred : ${response.statusText}` });
          return;
        }
        const coinsData = await response.json();
        setCoinsList(coinsData.result);
      } catch (error) {
        setError({ status: false, message: `Error occurred : ${error.message}` });
        return;
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [name]);

  const filteredCoins = coinsList?.filter((coin) => {
    return coin.name.toLowerCase().includes(name.trim().toLowerCase());
  });

  return (
    <>
      <div className="crypto-header">
        <h1>REACT FUZZY SEARCH APP</h1>
        <input
          className="input-style"
          type="text"
          placeholder="enter name of coin to search.."
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {loading && <div className="loading-container">LOADING ...</div>}
      {error && <div className="error-container">{error.message}</div>}
      <div className="crypto-display">
        {!loading && !error && filteredCoins.length == 0 ? (
          <p>No Coin Found :(</p>
        ) : (
          filteredCoins?.map((coin) => <Coincard key={coin.id} coin={coin} />)
        )}
      </div>
    </>
  );
}

export default App;
