import {configs} from "../configs/configs.js";
import {ExchangeCurrencyType} from "../types/ExchangeCurrencyType.js";
import {CurrencyEnum} from "../enums/generalEnums/currency.enum.js";
import {ExchangeRateResultType} from "../types/ExchangeRateResultType.js";

export class PrivatBank{
    public static async getExchangeRate(): Promise<ExchangeRateResultType>{
        const exchangeRates = await fetch(`${configs.PRIVATBANK_API}?exchange&coursid=5`).then(res => res.json()) as ExchangeCurrencyType[]
        return exchangeRates.reduce((accum, rate) => {
            accum[rate.ccy] = {
                buy: Number(rate.buy),
                sale: Number(rate.sale),
            }
            return accum
        }, {} as Record<CurrencyEnum, { buy: number, sale: number }>)
    }

}