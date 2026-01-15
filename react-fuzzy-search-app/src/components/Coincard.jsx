import "./Coincard.css";

const Coincard = ({ coin }) => {
  return (
    <div className="coincard">
      <h1>{coin.name}</h1>
      <img src={coin.icon} alt="coin-image" className="icon-style" />
      <h2>Rank : {coin.rank}</h2>
      <h3>Symbol: {coin.symbol}</h3>
      <h3>Price : $ {coin.price}</h3>
      <div>
        <a className="link-style" href={coin.websiteUrl} target="_blank" rel="noreferrer">
          Visit Coin&apos;s Website
        </a>
      </div>
      <br />
      <div>
        <a className="link-style" href={coin.twitterUrl} target="_blank" rel="noreferrer">
          Visit twitter profile
        </a>
      </div>
    </div>
  );
};

export default Coincard;
