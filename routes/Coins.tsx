import styled from "styled-components";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../routes/Coins.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  display: flex;
  flex-direction: row;
  justify-items: start;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid #d7d7d7;
  width: 900px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

export interface CoinInterface {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null;
  last_updated: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en",
      headers: { "x-cg-demo-api-key": "CG-pJfk4bgfPhgHCeb6YbR1FCF8" },
    };

    const fetchCoins = async () => {
      try {
        const response = await axios.request(options);
        setCoins(response.data.slice(0, 100));
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoins();
  }, []);

  const [search, setSearch] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  console.log(search);

  const filteredCoins = coins?.filter((coin) =>
    coin.symbol.toLowerCase().includes(search.toLocaleLowerCase())
  );
  console.log(coins);
  return (
    <Container>
      {/* <Header>
        <Title>코인</Title>
        </Header> */}
      {loading ? (
        <Loader>"Loading..."</Loader>
      ) : (
        <CoinsList>
          <div className="coin-app">
            <div className="coin-search">
              <h1 className="header">Coin List</h1>
              <h1 className="coin-text">Search a currency</h1>
              <form>
                <input
                  value={search}
                  type="text"
                  placeholder="...   Search the coin SYMBOL   ...      ▼"
                  className="coin-input"
                  onChange={handleChange}
                />

                <button
                  className="btn-11"
                  type="button"
                  onClick={() => setSearch("")}
                >
                  Reset
                </button>
              </form>
            </div>
          </div>
          {filteredCoins?.length === 0 ? (
            <div>
              <p className="noMatching">No matching coin not found.</p>
            </div>
          ) : (
            filteredCoins?.map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                  <div className="firstData">
                    <img src={coin.image} alt="crypto"></img>
                    <h1>{coin.name}</h1>
                    <p className="coin-symbol">{coin.symbol}</p>
                  </div>
                </Link>
                <div className="secondData">
                  <p className="coin-price">
                    ₩{coin.current_price.toLocaleString()}
                  </p>
                  {coin.price_change_percentage_24h < 0 ? (
                    <p className="coin-percent red">
                      ▼{Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                    </p>
                  ) : (
                    <p className="coin-percent green">
                      ▲{coin.price_change_percentage_24h.toFixed(2)}%
                    </p>
                  )}
                </div>
                <p className="coin-rank">Rank #{coin.market_cap_rank}</p>
              </Coin>
            ))
          )}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
