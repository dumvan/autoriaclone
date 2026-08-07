import {roleRepository} from "../repository/role.repository.js";
import {ApiError} from "../errors/api.error.js";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.js";
import {Role} from "../../prisma/src/generated/prisma/client.js";

class RoleService{
    public async getIdByName(name: string): Promise<number>{
        const roleRecord = await roleRepository.getByName(name)
        if(!roleRecord) throw new ApiError("Роль не знайдено", StatusCodeEnum.NOT_FOUND)
        return roleRecord.id
    }

    public async getList(): Promise<Role[]>{
        return await roleRepository.getList()
    }

}

export const roleService = new RoleService()