import {calculateAveragePriceCron} from "./average.price.cron.js";
import {removeOldTokensCron} from "./old.tokens.cron.js";
import {averageRatingCron} from "./dealership.rating.cron.js";

export const cronRunner = () => {
    console.log("cronRunner started!")
    calculateAveragePriceCron.start()
    removeOldTokensCron.start()
    averageRatingCron.start()
}