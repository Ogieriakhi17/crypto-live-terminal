import React from "react";
import Image from "next/image";
import { fetcher } from "@/lib/coingecko.actions";
import { formatCurrency } from "@/lib/utils";
import { CoinOverviewFallback } from "./fallback";
import CandlestickChart from "../CandlestickChart";

const CoinOverview = async () => {
  try {
    const trendingCoins = await fetcher<{ coins: TrendingCoin[] }>(
      "/search/trending",
      undefined,
      300,
    );
    const topTrendingCoinId = trendingCoins.coins?.[0]?.item?.id ?? "bitcoin";

    const [coin, coinOHLCData] = await Promise.all([
      fetcher<CoinDetailsData>(`/coins/${topTrendingCoinId}`, {
        dex_pair_format: "symbol",
      }),
      fetcher<OHLCData[]>(`/coins/${topTrendingCoinId}/ohlc`, {
        vs_currency: "usd",
        days: 1,
        precision: "full",
      }),
    ]);

    return (
      <div id="coin-overview">
        <CandlestickChart data={coinOHLCData} coinId={topTrendingCoinId}>
          <div className="header pt-2 flex items-center gap-3">
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={56}
              height={56}
            />

            <div className="info">
              <p>
                {coin.name} / {coin.symbol.toUpperCase()}
              </p>
              <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
            </div>
          </div>
        </CandlestickChart>
      </div>
    );
  } catch (error) {
    console.error("Error fetching coin overview:", error);
    return <CoinOverviewFallback />;
  }
};
export default CoinOverview;
