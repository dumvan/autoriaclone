import {Request, Response, NextFunction} from "express";
import {roleService} from "../services/role.service.js";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.js";

class RoleController{
    public async getList (req: Request, res: Response, next: NextFunction){
        try{
            const roles = await roleService.getList()
            res.status(StatusCodeEnum.OK).json(roles)
        }
        catch(e){
            next(e)
        }
    }

}

export const roleController = new RoleController()