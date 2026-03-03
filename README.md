#  CryptoWatch. — Live Cryptocurrency Terminal

CryptoWatch is a cryptocurrency monitoring terminal built with Next.js, TypeScript, and CoinGecko APIs, providing real-time market insights, trending assets, and detailed coin analytics through a fast, responsive dashboard interface.

The application delivers a terminal-style crypto tracking experience focused on performance, scalability, and clean data visualization.

## Features
- Live cryptocurrency market data
- Trending coins dashboard
- Detailed coin overview pages
- Market price & 24h performance tracking
- Server-side API fetching & caching
- Pagination for large market datasets
- Responsive UI with modern design system
- Optimized image loading via Next.js
- Type-safe API integration using TypeScript

## Preview
### Home Dashboard

Trending cryptocurrencies

Market overview

Price movement indicators

### All Coins

Paginated market listings

Rank, price, market cap, and 24h change

### Coin Details

Individual asset analytics

OHLC price data visualization

## Tech Stack
### Frontend

Next.js (App Router)

React

TypeScript

Tailwind CSS

shadcn/ui

Lucide Icons

### Data & APIs

CoinGecko Pro API

Fetch caching & ISR revalidation

## Environment Setup

Create a .env.local file:

```
COIN_GECKO_BASE_URL=https://pro-api.coingecko.com/api/v3
COIN_GECKO_API_KEY=YOUR_API_KEY
```

## Getting Started
1. Clone Repository
```
git clone https://github.com/yourusername/cryptowatch.git
cd cryptowatch
```

3. Install Dependencies
```
npm install
```

4. Run Development Server
```
npm run dev
```


Open:

http://localhost:3000


## Engineering Highlights

Built reusable generic DataTable component

Implemented scalable server-side pagination

Designed modular API handling layer

Strong TypeScript typing across UI + API

Clean separation of client/server logic

