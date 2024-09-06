import XhrJson from "./xhrjson";
import {Logger} from "add_logger"
import type {BasicCandle, rawExchangeCandle, TickerCandle, TickerData } from "./tradingCandles";
import {type OrderHandler} from "tradeOrders/orderHandler";

export interface Exchange extends TickerFetcher, CandleFetcher, AssetWallet,  OrderHandler {
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

export interface CandleFetcher {
  fetchCandles(symbol: string, minutes: number, limit: number): Promise<TickerCandle[] | null>;
}