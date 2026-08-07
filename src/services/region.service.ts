import {regionRepository} from "../repository/region.repository.js";
import {Region} from "../../prisma/src/generated/prisma/client.js";
import {BaseQueryType} from "../types/QueryType.js";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.js";
import {ApiError} from "../errors/api.error.js";

class RegionService{
    public async getList(query: BaseQueryType): Promise<[Region[], number]>{
        return await regionRepository.getList(query)
    }

    public async getNameById(id: number): Promise<string>{
        const regionRecord = await regionRepository.getById(id)
        if(!regionRecord) throw new ApiError("Регіон не знайдено", StatusCodeEnum.NOT_FOUND)
        return regionRecord.name
    }

}

export const regionService = new RegionService()
