import {Router} from "express";
import {userRouter} from "./user.router.js";
import {authRouter} from "./auth.router.js";
import {announcementRouter} from "./announcement.router.js";
import {subscriptionPlanRouter} from "./subscription.plan.router.js";
import {regionRouter} from "./region.router.js";
import {dealershipRouter} from "./dealership.router.js";
import {adminRouter} from "./admin/admin.index.router.js";
import {vehicleRouter} from "./vehicle.router.js";
import {reportedVehicleRouter} from "./reported.vehicle.router.js";

const router = Router()

router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/announcements', announcementRouter)
router.use('/subscription-plans', subscriptionPlanRouter)
router.use('/regions', regionRouter)
router.use('/dealerships', dealershipRouter)
router.use('/vehicles', vehicleRouter)
router.use('/reported-vehicles', reportedVehicleRouter)
router.use('/admins', adminRouter)

export const apiRouter = router



