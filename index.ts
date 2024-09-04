import XhrJson from "./xhrjson";
import {Logger} from "add_logger"
import type {rawExchangeCandle, TickerData } from "./tradingCandles";
import {type OrderHandler} from "tradeOrders/orderHandler";

export interface Exchange extends AssetWallet,  OrderHandler {
  fetchCandlesFromExchange(symbol: string, minutes: number, limit: number): Promise<rawExchangeCandle[] | null>;
  _candleCountFromCloseTimestamp(timestamp: number, minutes: number): number; // todo: figure out if to move or remove this
}

export interface AssetHolding {
  name: string;
  amount: number;
}

export interface AssetWallet {
  /**
   * Get all the assets supported by the platform(exchange?)
   */
  getSupportedAssets(): Promise<string[]>; // ['BTC','XRP']

  /**
   * Fetches all the holdings, name and value from the platform
   */
  getHoldings(): Promise<AssetHolding[]>;
}

export interface TickerFetcher {
  /**
   * Fetches all the trading pairs from the platform
   */
  getTickerSymbols(): Promise<string[]>;

  /**
   * Fetch a singular ticker and it's recent data
   */
  getTickerData(symbol: string): Promise<{data: TickerData,fromCache: Boolean} | null>;


  /**
   * e.g. getting the USDT pair symbol of an asset, on the platform
   * @param baseAsset 
   */
  getAssetDefaultTickerSymbol(baseAsset: string): string | null;
}