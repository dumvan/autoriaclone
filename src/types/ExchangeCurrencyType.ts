import {CurrencyEnum} from "../enums/generalEnums/currency.enum.js";

type ExchangeCurrencyType = {
  ccy: Exclude<CurrencyEnum, 'UAH'>;
  base_ccy: "UAH";
  buy: string;
  sale: string;
}

type ExchangeCurrencyMap = Map<CurrencyEnum, {buy: number, sale: number}>

export type {ExchangeCurrencyType, ExchangeCurrencyMap}