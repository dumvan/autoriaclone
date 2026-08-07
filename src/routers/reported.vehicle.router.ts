import {Router} from "express";
import {commonMiddleware} from "../middlewares/common.middleware.js";
import {ReportedVehicleValidator} from "../vaildators/reported.vehicle.validator.js";
import {reportedVehicleController} from "../controllers/reported.vehicle.controller.js";
import {strictAuthMiddleware} from "../middlewares/strict.auth.middleware.js";
import {userMiddleware} from "../middlewares/user.middleware.js";

const router = Router()

router.post("/", strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateBody(ReportedVehicleValidator.createReportedVehicle), reportedVehicleController.create)

export const reportedVehicleRouter = router