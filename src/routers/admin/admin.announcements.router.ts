import {Router} from "express";
import {announcementController} from "../../controllers/announcement.controller.js";
import {commonMiddleware} from "../../middlewares/common.middleware.js";
import {QueryValidator} from "../../vaildators/query.validator.js";
import {AnnouncementType} from "../../types/AnnouncementType.js";
import {announcementService} from "../../services/announcement.service.js";
import {AnnouncementPermissionsEnum} from "../../enums/permissionEnums/announcement.permissions.enum.js";

const router = Router()

router.get('/', commonMiddleware.validateUserPermission(AnnouncementPermissionsEnum.READ), commonMiddleware.validateQuery(QueryValidator.announcementValidator), announcementController.getListByAdmin)
router.get('/:announcementId', commonMiddleware.validateUserPermission(AnnouncementPermissionsEnum.READ), commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Оголошення", "announcementId"), announcementController.getByAdmin)
router.post('/:announcementId/reset-approve-attempts', commonMiddleware.validateUserPermission(AnnouncementPermissionsEnum.MODERATE), commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Оголошення", "announcementId"),announcementController.resetApproveAttempts)
router.post('/:announcementId/activate', commonMiddleware.validateUserPermission(AnnouncementPermissionsEnum.MODERATE), commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Оголошення", "announcementId"), announcementController.activate)
router.post('/:announcementId/deactivate', commonMiddleware.validateUserPermission(AnnouncementPermissionsEnum.MODERATE), commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Оголошення", "announcementId"), announcementController.deactivate)


export const adminAnnouncementsRouter = router