import {dealershipMemberRepository} from "../repository/dealership.member.repository.js";
import {dealershipRepository} from "../repository/dealership.repository.js";
import {CronJob} from "cron";

const averageRatingHandler = async () => {
    const averageRatings = await dealershipMemberRepository.getAverageRatings()
    averageRatings.map(async ({dealership_id, avg}) => {
        await dealershipRepository.update(dealership_id, {rating: avg})
    })
}

export const averageRatingCron = new CronJob("0 0 4 * * *", averageRatingHandler)