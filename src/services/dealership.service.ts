import {DealershipCreateWithInputDTOType, DealershipType, DealershipUpdateWithInputDTOType, DealershipUpdateWithoutInputDTOType} from "../types/DealershipType.js";
import {dealershipRepository} from "../repository/dealership.repository.js";
import {ApiError} from "../errors/api.error.js";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.js";
import {UploadedFile} from "express-fileupload";
import {s3Service} from "./s3.service.js";
import {FileItemTypeEnum} from "../enums/generalEnums/FileEnum.js";
import {dealershipMemberRepository} from "../repository/dealership.member.repository.js";
import {DealershipRoleEnum} from "../enums/vehicleEnums/dealership.enum.js";
import {DealershipQueryType} from "../types/QueryType.js";

class DealershipService{
    public async create(dto: DealershipCreateWithInputDTOType, user_id: string): Promise<DealershipType>{
        let dealership = await dealershipRepository.findOneByParams({owner_id: user_id})
        if(dealership){
            throw new ApiError("Користувач вже є власником автосалону", StatusCodeEnum.CONFLICT)
        }
        dealership = await dealershipRepository.create({...dto, owner_id: user_id})
        await dealershipMemberRepository.create({dealership_id: dealership._id, user_id, role: DealershipRoleEnum.OWNER})
        return dealership
    }

    public async get(id: string): Promise<DealershipType>{
        return await dealershipRepository.get(id) as DealershipType
    }

    public async getList(query: DealershipQueryType): Promise<[DealershipType[], number]>{
        return await dealershipRepository.getList(query)
    }

    public async update(id: string, dto: DealershipUpdateWithInputDTOType): Promise<DealershipType>{
        return await dealershipRepository.update(id, dto) as DealershipType
    }

    public async delete(id: string): Promise<DealershipType>{
        return await dealershipRepository.delete(id) as DealershipType
    }

    public async findOneByParams(params: DealershipUpdateWithoutInputDTOType): Promise<DealershipType | null>{
        return await dealershipRepository.findOneByParams(params)
    }

    public async uploadLogo(id: string, logo: UploadedFile): Promise<DealershipType>{
        const dealership = await this.get(id)
        if(dealership.logo){
            await s3Service.deleteFile(dealership.logo)
        }
        const path = await s3Service.uploadFile(FileItemTypeEnum.DEALERSHIP, id, logo)
        return await this.update(id, {logo: path})
    }

    public async deleteLogo(id: string): Promise<DealershipType>{
        const dealership = await this.get(id)
        if(!dealership.logo){
            throw new ApiError("Лого не знайдено", StatusCodeEnum.NOT_FOUND)
        }
        await s3Service.deleteFile(dealership.logo)
        return await this.update(id, {logo: null})
    }

    public async verify(id: string): Promise<DealershipType>{
        return await dealershipRepository.update(id, {is_verified: true}) as DealershipType
    }

    public async unverify(id: string): Promise<DealershipType>{
        return await dealershipRepository.update(id, {is_verified: false}) as DealershipType
    }



}

export const dealerShipService= new DealershipService()

