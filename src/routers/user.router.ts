import {Router} from "express";
import {userController} from "../controllers/user.controller.js";
import {commonMiddleware} from "../middlewares/common.middleware.js";
import {UserValidator} from "../vaildators/user.validator.js";
import {QueryValidator} from "../vaildators/query.validator.js";
import {fileMiddleware} from "../middlewares/file.middleware.js";
import {avatarConfig} from "../constants/avatar.constants.js";
import {strictAuthMiddleware} from "../middlewares/strict.auth.middleware.js";

const router = Router()

router.use(strictAuthMiddleware.validateAccessToken)

router.get('/me', userController.getMe)
router.patch('/me', commonMiddleware.validateBody(UserValidator.updateUser), userController.updateMe)
router.delete('/me', userController.deleteMe)
router.post('/me/avatar', fileMiddleware.validateFile('avatar', avatarConfig), userController.uploadAvatar)
router.delete('/me/avatar', userController.deleteAvatar)
router.get('/me/membership', userController.getMembership)
router.get('/me/announcements', commonMiddleware.validateQuery(QueryValidator.announcementValidator), userController.getAnnouncementList)
router.get('/me/subscription', userController.getSubscription)
router.get('/me/reviews', commonMiddleware.validateQuery(QueryValidator.dealershipReviewValidator), userController.getReviews)



export const userRouter = router