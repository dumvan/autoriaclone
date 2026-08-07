import {Router} from "express";
import {commonMiddleware} from "../../middlewares/common.middleware.js";
import {DealershipType} from "../../types/DealershipType.js";
import {dealerShipService} from "../../services/dealership.service.js";
import {dealershipController} from "../../controllers/dealership.controller.js";
import {DealershipPermissionsEnum} from "../../enums/permissionEnums/dealership.permission.enum.js";

const router = Router()

router.post('/:dealershipId/verify', commonMiddleware.validateUserPermission(DealershipPermissionsEnum.MODERATE), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), dealershipController.verify)
router.post('/:dealershipId/unverify', commonMiddleware.validateUserPermission(DealershipPermissionsEnum.MODERATE), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), dealershipController.unverify)

export const adminDealershipsRouter = router