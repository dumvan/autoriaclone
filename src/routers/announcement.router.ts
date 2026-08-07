import {Router} from "express";
import {commonMiddleware} from "../middlewares/common.middleware.js";
import {strictAuthMiddleware} from "../middlewares/strict.auth.middleware.js";
import {AnnouncementValidator} from "../vaildators/announcement.validator.js";
import {AnnouncementType} from "../types/AnnouncementType.js";
import {announcementService} from "../services/announcement.service.js";
import {announcementController} from "../controllers/announcement.controller.js";
import {fileMiddleware} from "../middlewares/file.middleware.js";
import {announcementConfig} from "../constants/announcement.constant.js"
import {ImageValidator} from "../vaildators/image.validator.js";
import {QueryValidator} from "../vaildators/query.validator.js";
import {userMiddleware} from "../middlewares/user.middleware.js";
import {announcementMiddleware} from "../middlewares/announcement.middleware.js";
import {optionalAuthMiddleware} from "../middlewares/optional.auth.middleware.js";

const router = Router()

router.get('/', commonMiddleware.validateQuery(QueryValidator.announcementValidator), announcementController.getList)
router.post('/', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateBody(AnnouncementValidator.createAnnouncement),announcementController.create)
router.get('/:announcementId', optionalAuthMiddleware.validateAccessToken, commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Оголошення", "announcementId"), announcementMiddleware.checkOptionalAccess, announcementController.get)
router.delete('/:announcementId', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Оголошення", "announcementId"), announcementMiddleware.checkStrictAccess, announcementController.delete)
router.patch('/:announcementId', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Оголошення", "announcementId"), announcementMiddleware.checkStrictAccess, commonMiddleware.validateBody(AnnouncementValidator.updateAnnouncement), announcementController.update)
router.post('/:announcementId/images', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Оголошення", "announcementId"), announcementMiddleware.checkStrictAccess, fileMiddleware.validateManyFiles("images", announcementConfig), announcementController.upload)
router.post('/:announcementId/images/delete', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Оголошення", "announcementId"), announcementMiddleware.checkStrictAccess, commonMiddleware.validateBody(ImageValidator.validator),announcementController.deleteImages)
router.get('/:announcementId/statistics', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, userMiddleware.checkPremiumAccount, commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Оголошення", "announcementId"), announcementMiddleware.checkStrictAccess, announcementController.getStatistics)
router.post('/:announcementId/statistics/views', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("announcementId", "mongo"), commonMiddleware.validateEntityExisting<AnnouncementType>(announcementService, "Оголошення", "announcementId"), announcementMiddleware.checkAnnouncementIsActive, announcementController.increaseViews)


export const announcementRouter = router
