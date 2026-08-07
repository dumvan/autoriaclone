import {Request, Response, NextFunction} from "express";
import {TokenPayloadType} from "../types/TokenType.js";
import {userService} from "../services/user.service.js";
import {AdminRoleEnums} from "../enums/adminEnums/admin.role.enums.js";
import {ApiError} from "../errors/api.error.js";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.js";

class AdminMiddleware{
    public async checkAccess(req: Request, res: Response, next: NextFunction){
        try{
            const {user_id} = res.locals.payload as TokenPayloadType
            const user = await userService.get(user_id)
            const isAdmin = Object.values(AdminRoleEnums).some(roleName => user.Role.name === roleName)
            if(!isAdmin){
                throw new ApiError("Доступ заборонено", StatusCodeEnum.FORBIDDEN)
            }
            next()
        }
        catch(e){
            next(e)
        }
    }

}

export const adminMiddleware = new AdminMiddleware()