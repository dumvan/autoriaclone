import {SubscriptionPurchase} from "../../prisma/src/generated/prisma/client.js";
import {SubscriptionPurchaseGetPayload} from "../../prisma/src/generated/prisma/models/SubscriptionPurchase.js";
import {subscriptionPlanPresenter} from "./subscription.plan.presenter.js";
import {userPresenter} from "./user.presenter.js";
import {SubscriptionPurchaseWithPlanAndUserType} from "../repository/subscription.purchase.repository.js";

class SubscriptionPurchasePresenter{
    public res(subscriptionPurchase: SubscriptionPurchase){
        const {user_id, subscription_plan_id, ...restSubscriptionPurchase} = subscriptionPurchase
        return restSubscriptionPurchase
    }

    public userSubscriptionPurchaseRes(dto: SubscriptionPurchaseWithPlanAndUserType){
        const {User, SubscriptionPlan, ...subscriptionPurchase} = dto
        return {
            subscription_purchase: subscriptionPurchasePresenter.res(subscriptionPurchase),
            subscription_plan: subscriptionPlanPresenter.res(SubscriptionPlan)
        }
    }

    public subscriptionPurchaseRes(dto: SubscriptionPurchaseGetPayload<{ include: {SubscriptionPlan: true, User: { include: {Role: true, Region: true} }}}>){
        const {User, SubscriptionPlan, ...subscriptionPurchase} = dto
        return {
            subscription_purchase: subscriptionPurchasePresenter.res(subscriptionPurchase),
            subscription_plan: subscriptionPlanPresenter.res(SubscriptionPlan),
            user: userPresenter.publicRes(User)
        }
    }


}

export const subscriptionPurchasePresenter = new SubscriptionPurchasePresenter()