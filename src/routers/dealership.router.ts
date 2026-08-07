import {Router} from "express";
import {commonMiddleware} from "../middlewares/common.middleware.js";
import {DealershipValidator} from "../vaildators/dealership.validator.js";
import {dealershipController} from "../controllers/dealership.controller.js";
import {DealershipType} from "../types/DealershipType.js";
import {dealerShipService} from "../services/dealership.service.js";
import {fileMiddleware} from "../middlewares/file.middleware.js";
import {dealershipLogoConfig} from "../constants/dealership.logo.constant.js";
import {strictAuthMiddleware} from "../middlewares/strict.auth.middleware.js";
import {DealershipReviewValidator} from "../vaildators/dealership.review.validator.js";
import {DealershipMemberValidator} from "../vaildators/dealership.member.validator.js";
import {DealershipMemberType} from "../types/DealershipMemberType.js";
import {dealershipMemberService} from "../services/dealership.member.service.js";
import {DealershipMemberPermissionsEnum} from "../constants/dealership.member.role.permissions.js";
import {dealershipMemberMiddleware} from "../middlewares/dealership.member.middleware.js";
import {QueryValidator} from "../vaildators/query.validator.js";
import { DealershipReviewType } from "../types/DealershipReviewType.js";
import {dealershipReviewService} from "../services/dealership.review.service.js";
import { dealershipReviewController } from "../controllers/dealership.review.controller.js";
import {userMiddleware} from "../middlewares/user.middleware.js";

const router = Router()

router.post('/', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateBody(DealershipValidator.createValidator), dealershipController.create)
router.get('/', commonMiddleware.validateQuery(QueryValidator.dealershipValidator), dealershipController.getList)
router.get('/:dealershipId', commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), dealershipController.get)
router.patch('/:dealershipId', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.UPDATE_INFO), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateBody(DealershipValidator.updateValidator), dealershipController.update)
router.delete('/:dealershipId', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.DELETE_DEALERSHIP), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), dealershipController.delete)
router.post('/:dealershipId/logo', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.UPDATE_INFO), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), fileMiddleware.validateFile("logo", dealershipLogoConfig), dealershipController.uploadLogo)
router.delete('/:dealershipId/logo', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.UPDATE_INFO), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), dealershipController.deleteLogo)

router.post('/:dealershipId/reviews', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateBody(DealershipReviewValidator.createValidator), dealershipReviewController.create)
router.get('/:dealershipId/reviews', commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateQuery(QueryValidator.dealershipReviewValidator), dealershipReviewController.getDealershipReviews)
router.get('/:dealershipId/reviews/:reviewId', commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateId("reviewId", "mongo"), commonMiddleware.validateEntityExisting<DealershipReviewType>(dealershipReviewService, "Відгук", "reviewId"), dealershipReviewController.get)
router.patch('/:dealershipId/reviews/:reviewId', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateId("reviewId", "mongo"), commonMiddleware.validateEntityExisting<DealershipReviewType>(dealershipReviewService, "Відгук", "reviewId"), dealershipMemberMiddleware.checkReview, commonMiddleware.validateBody(DealershipReviewValidator.updateValidator), dealershipReviewController.update)
router.delete('/:dealershipId/reviews/:reviewId', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateId("reviewId", "mongo"), commonMiddleware.validateEntityExisting<DealershipReviewType>(dealershipReviewService, "Відгук", "reviewId"), dealershipMemberMiddleware.checkReview, dealershipReviewController.delete)


router.get('/:dealershipId/members', commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), commonMiddleware.validateQuery(QueryValidator.basePaginationValidator), dealershipController.getMembers)
router.get('/:dealershipId/members/:memberId', commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateId("memberId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateEntityExisting<DealershipMemberType>(dealershipMemberService, "Працівник автосалона", "memberId"), dealershipController.getMember)
router.post('/:dealershipId/members', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.MANAGE_MEMBERS), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateBody(DealershipMemberValidator.create) ,dealershipController.addMember)
router.delete('/:dealershipId/members/:memberId', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.MANAGE_MEMBERS), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateId("memberId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateEntityExisting<DealershipMemberType>(dealershipMemberService, "Працівник автосалона", "memberId"), dealershipMemberMiddleware.checkMember, dealershipController.deleteMember)
router.patch('/:dealershipId/members/:memberId', strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, commonMiddleware.validateDealershipMemberPermission(DealershipMemberPermissionsEnum.MANAGE_MEMBERS), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateId("memberId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Автосалон", "dealershipId"), commonMiddleware.validateEntityExisting<DealershipMemberType>(dealershipMemberService, "Працівник автосалона", "memberId"), dealershipMemberMiddleware.checkMember, commonMiddleware.validateBody(DealershipMemberValidator.update), dealershipController.updateMember)

router.get('/:dealershipId/announcements', commonMiddleware.validateQuery(QueryValidator.announcementValidator), commonMiddleware.validateId("dealershipId", "mongo"), commonMiddleware.validateEntityExisting<DealershipType>(dealerShipService, "Dealership", "dealershipId"), dealershipController.getAnnouncements)

export const dealershipRouter = router