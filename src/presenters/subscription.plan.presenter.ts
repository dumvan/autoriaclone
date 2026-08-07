import {SubscriptionPlan} from "../../prisma/src/generated/prisma/client.js";

class SubscriptionPlanPresenter{
    public res(subscriptionPlan: SubscriptionPlan){
        const {is_active, ...restSubscriptionPlan} = subscriptionPlan
        return restSubscriptionPlan
    }


}

export const subscriptionPlanPresenter = new SubscriptionPlanPresenter()