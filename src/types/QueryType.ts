import {UserOrderByEnum} from "../enums/userEnums/user.order.by.enum.js";
import {OrderEnum} from "../enums/generalEnums/order.enum.js";
import {UserSearchByEnum} from "../enums/userEnums/user.search.by.enum.js";
import {AnnouncementSearchByEnum} from "../enums/announcementEnums/announcement.search.by.enum.js";
import {AnnouncementOrderByEnum} from "../enums/announcementEnums/announcement.order.by.enum.js";
import {AnnouncementRangeByEnum} from "../enums/announcementEnums/announcement.range.by.enum.js";
import {DealershipSearchByEnum} from "../enums/dealershipEnums/dealership.searchBy.enum.js";
import {DealershipOrderByEnum} from "../enums/dealershipEnums/dealership.orderBy.enum.js";
import {DealershipReviewOrderByEnum} from "../enums/dealershipReviewsEnums/dealership.review.orderBy.enum.js";
import {DealershipReviewSearchByEnum} from "../enums/dealershipReviewsEnums/dealership.review.searchBy.enum.js";

export type QueryType<T,K> = {
    page: number
    limit: number
    skip: number
    search?: string
    searchBy?: T
    order: OrderEnum
    orderBy?: K,
    rangeBy?: AnnouncementRangeByEnum
    from?: number,
    to?: number
}

type BaseQueryType = {
    page: number
    limit: number
    skip: number
}

type UserQueryType = QueryType<UserSearchByEnum, UserOrderByEnum>
type AnnouncementQueryType = QueryType<AnnouncementSearchByEnum, AnnouncementOrderByEnum>
type DealershipQueryType = QueryType<DealershipSearchByEnum, DealershipOrderByEnum>
type DealershipReviewQueryType = QueryType<DealershipReviewSearchByEnum, DealershipReviewOrderByEnum>
type DealershipMemberQueryType = QueryType<undefined, undefined>


export type {UserQueryType, BaseQueryType, AnnouncementQueryType, DealershipQueryType, DealershipReviewQueryType, DealershipMemberQueryType}