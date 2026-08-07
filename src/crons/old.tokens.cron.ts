import {TimeHelper} from "../timeHelper/time.helper.js";
import {configs} from "../configs/configs.js";
import {tokenRepository} from "../repository/token.repository.js";
import {CronJob} from "cron";

const removeOldTokensHandler = async() => {
    const {value, unit} = TimeHelper.parseTime(configs.JWT_REFRESH_LIFETIME)
    const date = TimeHelper.subTime(value, unit)
    const {count} = await tokenRepository.deleteBeforeDate(date)
    console.log(`Deleted ${count} tokens`)
}

export const removeOldTokensCron = new CronJob("0 0 4 * * * ", removeOldTokensHandler)