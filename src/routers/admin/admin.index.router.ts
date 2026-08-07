import {Router} from "express";
import {adminUsersRouter} from "./admin.users.router.js";
import {adminDealershipsRouter} from "./admin.dealerships.router.js";
import {strictAuthMiddleware} from "../../middlewares/strict.auth.middleware.js";
import {adminMiddleware} from "../../middlewares/admin.middleware.js";
import {userMiddleware} from "../../middlewares/user.middleware.js";
import {adminAnnouncementsRouter} from "./admin.announcements.router.js";
import {adminSubscriptionsRouter} from "./admin.subscriptions.router.js";
import {adminRolesRouter} from "./admin.roles.router.js";
import {adminReportedVehicleRouter} from "./admin.reported.vehicle.router.js";

const router = Router()


router.use(strictAuthMiddleware.validateAccessToken, userMiddleware.checkUserIsBanned, adminMiddleware.checkAccess)
router.use('/users', adminUsersRouter)
router.use('/dealerships', adminDealershipsRouter)
router.use('/announcements', adminAnnouncementsRouter)
router.use('/subscriptions', adminSubscriptionsRouter)
router.use('/roles', adminRolesRouter)
router.use('/reported-vehicles', adminReportedVehicleRouter)


export const adminRouter = router