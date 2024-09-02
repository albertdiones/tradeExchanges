import XhrJson from "./xhrjson";
import {Logger} from "add_logger"
import type {rawExchangeCandle, TickerData } from "./tradingCandles";
import {type OrderHandler} from "tradeOrders/orderHandler";

export interface Exchange extends OrderHandler {
  fetchCandlesFromExchange(symbol: string, minutes: number, limit: number): Promise<rawExchangeCandle[] | null>;
  getAssets(): Promise<string[]>;
  getTickerData(symbol: string): Promise<{data: TickerData,fromCache: Boolean} | null>;
  _candleCountFromCloseTimestamp(timestamp: number, minutes: number): number; // todo: figure out if to move or remove this
  getUsdtSymbol(baseAsset: string): string | null;
}