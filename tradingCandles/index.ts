import { latestFirst, oldestFirst } from "./sorters";

export type TickerCandle = BasicCandle & HasVolumeData;

// fallback @deprecated use TickerCandle
export type rawExchangeCandle = TickerCandle;

export interface HasVolumeData {
    base_volume: number; // volume on the coin
    quote_volume: number; // e.g. usdt or btc
}

export interface HasTradeCount {
    trades: number; // int # trades
}

export interface HasBuyerTakerData {
    buyer_base_volume?: number;
    buyer_quote_volume?: number;
}


export interface rawIndexCandle extends BasicCandle {
    name: string,
    type: string
}

export interface EmaIndicator {
    ema?: { [key: number]: number }
}

export interface RsiIndicator {
    rsi: number;
}

export interface Candle<indicators = {}> extends BasicCandle {
    indicators: indicators;
}

export type CandleWithEma = Candle<EmaIndicator>;

//
//export type CandleWithIndicators = Candle<EmaIndicator & RsiIndicator>

export interface BasicCandle {
    open: number;
    high: number;
    low: number;
    close: number;
    open_timestamp: number;
    close_timestamp: number;
}

// ticker data for today
export interface TickerData {
    symbol: string,
    current: number,
    open?: number,
    high: number,
    low: number,
    base_volume: number,
    quote_volume: number,
    tags?: string[],
    circulating_supply?: number,
    status?: string,
    full_data: object
}


export function getLatestCandle(candles: BasicCandle[],  offset:number = 0): BasicCandle {
    return [...candles].sort(latestFirst).slice(offset)[0];
}


export function getOldestCandle(candles: BasicCandle[],  offset:number = 0): BasicCandle {
    return [...candles].sort(oldestFirst).slice(offset)[0];
}