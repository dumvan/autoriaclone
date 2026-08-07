import {Router} from "express";
import {regionController} from "../controllers/region.controller.js";
import {commonMiddleware} from "../middlewares/common.middleware.js";
import {QueryValidator} from "../vaildators/query.validator.js";

const router = Router()

router.get('/', commonMiddleware.validateQuery(QueryValidator.basePaginationValidator), regionController.getList)

export const regionRouter = router