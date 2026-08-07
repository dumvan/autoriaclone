import {Request, Response, NextFunction} from "express";
import {regionService} from "../services/region.service.js";
import {StatusCodeEnum} from "../enums/generalEnums/status.code.enum.js";
import {BaseQueryType} from "../types/QueryType.js";

class RegionController{
    public async getList (req: Request, res: Response, next: NextFunction){
        try{
            const query = req.query as unknown as BaseQueryType
            const [regions, total] = await regionService.getList(query)
            res.status(StatusCodeEnum.OK).json({
                data: regions,
                total,
                ...query
            })
        }
        catch(e){
            next(e)
        }
    }

}

export const regionController = new RegionController()