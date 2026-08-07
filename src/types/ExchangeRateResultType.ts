import {CurrencyEnum} from "../enums/generalEnums/currency.enum.js";

export type ExchangeRateResultType = Record<CurrencyEnum, { buy: number, sale: number }>