import {prisma} from "../../prisma/prisma.client.js";
import {AnnouncementStatistics} from "../../prisma/src/generated/prisma/client.js";

class AnnouncementStatisticsRepository{
    public async getByAnnouncementId(id: string): Promise<AnnouncementStatistics | null>{
        return await prisma.announcementStatistics.findUnique({where: {announcement_id: id}})
    }

    public async create(id: string): Promise<AnnouncementStatistics>{
        return await prisma.announcementStatistics.create({data: {announcement_id: id}})
    }

    public async increaseViewCount(id: string): Promise<AnnouncementStatistics | null>{
        return await prisma.announcementStatistics.update({where: {announcement_id: id}, data: {total_views: {increment: 1}}})
    }

}

export const announcementStatisticsRepository = new AnnouncementStatisticsRepository();