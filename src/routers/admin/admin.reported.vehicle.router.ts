import {Router} from "express";
import {commonMiddleware} from "../../middlewares/common.middleware.js";
import {QueryValidator} from "../../vaildators/query.validator.js";
import {reportedVehicleController} from "../../controllers/reported.vehicle.controller.js";
import {ReportedVehiclesPermissionsEnum} from "../../enums/permissionEnums/reported.vehicles.permissions.enum.js";
import {ReportedVehicleType} from "../../types/ReportedVehicleType.js";
import {reportedVehicleService} from "../../services/reported.vehicle.service.js";

const router = Router()

router.get("/", commonMiddleware.validateUserPermission(ReportedVehiclesPermissionsEnum.READ), commonMiddleware.validateQuery(QueryValidator.basePaginationValidator), reportedVehicleController.getList)
router.post("/:reportedVehicleId/confirm", commonMiddleware.validateUserPermission(ReportedVehiclesPermissionsEnum.MODERATE), commonMiddleware.validateId("reportedVehicleId", "mongo"), commonMiddleware.validateEntityExisting<ReportedVehicleType>(reportedVehicleService,"Транспортного засобу", "reportedVehicleId"), reportedVehicleController.confirm)
router.delete("/:reportedVehicleId", commonMiddleware.validateUserPermission(ReportedVehiclesPermissionsEnum.MODERATE), commonMiddleware.validateId("reportedVehicleId", "mongo"), commonMiddleware.validateEntityExisting<ReportedVehicleType>(reportedVehicleService,"Транспортного засобу", "reportedVehicleId"), reportedVehicleController.reject)

export const adminReportedVehicleRouter = router