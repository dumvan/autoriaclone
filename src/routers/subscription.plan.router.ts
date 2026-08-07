import {Router} from "express";
import {subscriptionPlanController} from "../controllers/subscription.plan.controller.js";
import {commonMiddleware} from "../middlewares/common.middleware.js";
import {SubscriptionPlan} from "../../prisma/src/generated/prisma/client.js";
import {subscriptionPlanService} from "../services/subscription.plan.service.js";
import {strictAuthMiddleware} from "../middlewares/strict.auth.middleware.js";

const router = Router()

router.get('/', subscriptionPlanController.getList)
router.get('/:planId', commonMiddleware.validateId("planId", "mysql"), commonMiddleware.validateEntityExisting<SubscriptionPlan>(subscriptionPlanService, "SubscriptionPlan", "planId"), subscriptionPlanController.get)
router.post('/:planId/purchase', strictAuthMiddleware.validateAccessToken, commonMiddleware.validateId("planId", "mysql"), commonMiddleware.validateEntityExisting<SubscriptionPlan>(subscriptionPlanService, "SubscriptionPlan", "planId"), subscriptionPlanController.purchase)

export const subscriptionPlanRouter = router