import {BaseQueryType} from "../types/QueryType.js";
import {reportedVehicleRepository} from "../repository/reported.vehicle.repository.js";
import {CreateReportedVehicleDTOType, ReportedVehicleType} from "../types/ReportedVehicleType.js";
import {vehicleRepository} from "../repository/vehicle.repository.js";
import {ApiError} from "../errors/api.error.js";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.js";

class ReportedVehicleService{
    public async get(id: string): Promise<ReportedVehicleType>{
        return await reportedVehicleRepository.get(id) as ReportedVehicleType
    }

    public async create(dto: CreateReportedVehicleDTOType, user_id: string): Promise<ReportedVehicleType>{
        const isVehicleExists = await vehicleRepository.isVehicleExists(dto)
        if(isVehicleExists){
            throw new ApiError("Транспорт з такими даними вже існує", StatusCodeEnum.CONFLICT)
        }
        const isReportedVehicleExists = await reportedVehicleRepository.isReportedVehicleExists(dto)
        if(isReportedVehicleExists){
            throw new ApiError("Транспорт з такими даними вже на розгляді", StatusCodeEnum.CONFLICT)
        }
        return await reportedVehicleRepository.create({...dto, user_id})
    }

    public async getList(query: BaseQueryType): Promise<[ReportedVehicleType[], number]>{
        return await reportedVehicleRepository.getList(query)
    }

    public async confirm(id: string): Promise<ReportedVehicleType>{
        const reportedVehicle = await reportedVehicleService.get(id)
        await vehicleRepository.update(reportedVehicle)
        return await reportedVehicleRepository.delete(id) as ReportedVehicleType
    }

    public async delete(id: string): Promise<ReportedVehicleType>{
        return await reportedVehicleRepository.delete(id) as ReportedVehicleType
    }


}

export const reportedVehicleService = new ReportedVehicleService()