import React from 'react'
import Image from 'next/image'
import DataTable from '@/components/DataTable'
import Link from 'next/link'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { fetcher } from '@/lib/coingecko.actions'


type TrendingCoin = {
  item: {
    id: string
    name: string
    symbol: string
    thumb: string
    large: string
    price_change_percentage_24h: {
      usd: number
    }
    data: {
      price: string
    }
  }
}


const dummyTrendingCoins: TrendingCoin[] = [
  {
    item: {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      thumb: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      large: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      price_change_percentage_24h: { usd: 2.34 },
      data: { price: '$98,245' },
    },
  },
  {
    item: {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      thumb: 'https://assets.coingecko.com/coins/images/1/large/ethereum.png',
      large: 'https://assets.coingecko.com/coins/images/1/large/ethereum.png',
      price_change_percentage_24h: { usd: -1.12 },
      data: { price: '$3,421' },
    },
  },
  {
    item: {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      thumb: 'https://assets.coingecko.com/coins/images/1/large/solana.png',
      large: 'https://assets.coingecko.com/coins/images/1/large/solana.png',
      price_change_percentage_24h: { usd: 5.87 },
      data: { price: '$192' },
    },
  },
]


const columns = [
  {
    header: 'Name',
    cellClassName: 'name-cell',

    cell: (coin: TrendingCoin) => {
      const item = coin.item

      return (
        <Link
          href={`/coins/${item.id}`}
          className="flex items-center gap-3"
        >
          <Image
            src={item.large}
            alt={item.name}
            width={36}
            height={36}
          />

          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-xs text-gray-400">{item.symbol}</p>
          </div>
        </Link>
      )
    },
  },

  {
    header: '24h Change',
    cellClassName: 'price-cell',

    cell: (coin: TrendingCoin) => {
      const change = coin.item.price_change_percentage_24h.usd
      const isUp = change > 0

      return (
        <div className={cn(
          'flex items-center gap-1 font-medium',
          isUp ? 'text-green-500' : 'text-red-500'
        )}>
          {isUp
            ? <TrendingUp size={16} />
            : <TrendingDown size={16} />
          }

          {change.toFixed(2)}%
        </div>
      )
    },
  },

  {
    header: 'Price',
    cellClassName: 'price-cell',

    cell: (coin: TrendingCoin) =>
      coin.item.data.price,
  },
]

const Page = async () => {
    const coin = await fetcher<CoinDetailsData>('coins/bitcoin', {
    dex_par_format: 'symbol'
  });

  return (
    <main className="main-container">

      <section className="home-grid">

        <div id="coin-overview">

          <div className="header pt-2 flex items-center gap-3">

            <Image
              src={coin.image.large}
              alt={coin.name}
              width={56}
              height={56}
            />

            <div className="info">
              <p>{coin.name} / {coin.symbol.toUpperCase()}</p>
              <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
            </div>

          </div>

        </div>

        <p className="text-lg font-semibold">
          Trending Coins
        </p>

        <DataTable<TrendingCoin>
          columns={columns}
          data={dummyTrendingCoins}

          rowKey={(coin) => coin.item.id}

          tableClassName="mt-3"
        />

      </section>

      <section className="w-full mt-7 space-y-4">
        <p>Categories</p>
      </section>

    </main>
  )
}

export default Page
