import XhrJson from "./xhrjson";
import {Logger} from "add_logger"
import type {rawExchangeCandle, TickerData } from "./tradingCandles";
import {type OrderHandler} from "tradeOrders/orderHandler";

export interface Exchange extends AssetWallet, OrderHandler {
  fetchCandlesFromExchange(symbol: string, minutes: number, limit: number): Promise<rawExchangeCandle[] | null>;
  getTickerData(symbol: string): Promise<{data: TickerData,fromCache: Boolean} | null>;
  _candleCountFromCloseTimestamp(timestamp: number, minutes: number): number; // todo: figure out if to move or remove this
  getUsdtSymbol(baseAsset: string): string | null;
}

export interface AssetHolding {
  name: string;
  amount: number;
}

export interface AssetWallet {
  /**
   * Get all the assets supported by the platform(exchange?)
   */
  getSupportedAssets(): Promise<string[]>;

  /**
   * Fetches all the holdings, name and value from the platform
   */
  fetchHoldings(): AssetHolding[];
}