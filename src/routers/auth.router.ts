import {Router} from "express";
import {UserValidator} from "../vaildators/user.validator.js";
import {commonMiddleware} from "../middlewares/common.middleware.js";
import {userMiddleware} from "../middlewares/user.middleware.js";
import {authController} from "../controllers/auth.controller.js";
import {strictAuthMiddleware} from "../middlewares/strict.auth.middleware.js";
import {AuthValidator} from "../vaildators/auth.validator.js";

const router = Router()

router.post('/sign-up', commonMiddleware.validateBody(UserValidator.createUser), userMiddleware.checkEmailTaken, authController.signUp)
router.post('/sign-in', commonMiddleware.validateBody(UserValidator.signIn), authController.signIn)
router.post('/refresh', commonMiddleware.validateBody(AuthValidator.refreshToken), strictAuthMiddleware.validateRefreshToken, authController.refresh)
router.post('/log-out', strictAuthMiddleware.validateAccessToken, authController.logOut)
router.post('/log-out-all', strictAuthMiddleware.validateAccessToken, authController.logOutAll)
router.patch('/activate/:token', authController.activate)
router.post('/password/recovery', commonMiddleware.validateBody(UserValidator.recoveryRequest), userMiddleware.checkEmailExists, authController.recoveryRequest)
router.post('/password/recovery/:token', commonMiddleware.validateBody(UserValidator.recovery), authController.recovery)
router.post('/password/change', strictAuthMiddleware.validateAccessToken, commonMiddleware.validateBody(UserValidator.change), authController.change)

export const authRouter = router