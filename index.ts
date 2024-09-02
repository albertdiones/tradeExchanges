import XhrJson from "./xhrjson";
import {Logger} from "add_logger"
import type {rawExchangeCandle, TickerData } from "./tradingCandles";
import {type OrderHandler} from "tradeOrders/orderHandler";

export interface Exchange extends AssetWallet, TickerFetcher, CandleFetcher, OrderHandler {
  
}

export interface AssetWallet {  
  getAssets(): Promise<string[]>; // ['BTC','XRP']
  fetchWallet(): Array<[string, string, number, number, number, string, object]> {    
    return this._fetch('/v2/auth/r/wallets', {})
    .then((result) => {
        return result;
    });
}
}

export interface TickerFetcher {
  
  getTickers(): Promise<string[]>; // ['BTC','XRP']

  getTickerData(symbol: string): Promise<{data: TickerData,fromCache: Boolean} | null>;
  getDefaultTickerSymbol(baseAsset: string): string | null;
}



export interface CandleFetcher { 
  
  fetchCandlesFromExchange(symbol: string, minutes: number, limit: number): Promise<rawExchangeCandle[] | null>;
  
  _candleCountFromCloseTimestamp(timestamp: number, minutes: number): number; // todo: figure out if to move or remove this

}