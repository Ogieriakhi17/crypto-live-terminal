import { fetcher } from "@/lib/coingecko.actions";
import Link from "next/link";
import Image from "next/image";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import DataTable from "@/components/DataTable";

const Page = async () => {
  const columns: DataTableColumn<CoinMarketData[]> = [
    {
      header: "Rank",
      cellClassName: "rank-cell",
      cell: (coin) => (
        <>
          #{coin.market_cap_rank}
          <Link href={`/coins/${coin.id}`} aria-label="View coin" />
        </>
      ),
    },
    {
      header: "Token",
      cellClassName: "token-cell",
      cell: (coin) => (
        <div className="token-info">
          <Image src={coin.image} alt={coin.name} width={36} height={36} />
          <p>
            {coin.name} ({coin.symbol.toUpperCase()})
          </p>
        </div>
      ),
    },
    {
        header: "Price",
        cellClassName: "price-cell",
        cell: (coin) => (
            formatCurrency(coin.current_price)
        ),
    },
    {
      header: '24h Change',
      cellClassName: 'change-cell',
      cell: (coin) => {
        const isTrendingUp = coin.price_change_percentage_24h > 0;

        return (
          <span
            className={cn('change-value', {
              'text-green-600': isTrendingUp,
              'text-red-500': !isTrendingUp,
            })}
          >
            {isTrendingUp && '+'}
            {formatPercentage(coin.price_change_percentage_24h)}
          </span>
        );
      },
    },
    {
      header: 'Market Cap',
      cellClassName: 'market-cap-cell',
      cell: (coin) => formatCurrency(coin.market_cap),
    },
  ];

  let coinsData: CoinMarketData[] = [];
  try 
  {
    coinsData = await fetcher<CoinMarketData[]>("/coins/markets", {
      vs_currency: "usd",
    });
  } catch (error) 
  {
    console.log("Error fetching coins data:", error);
  }

  return (
    <div>
      <h2>Coins Page</h2>
      <DataTable
        columns={columns}
        data={coinsData}
        rowKey={(_, index) => index}
        tableClassName="mt-3"
      />
    </div>
  );
};

export default Page;
