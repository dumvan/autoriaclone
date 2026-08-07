import {AnnouncementType} from "./AnnouncementType.js";
import {VehicleType} from "./VehicleType.js";
import {UserWithIncludedRegionAndRoleType} from "./UserWithIncludeDataType.js";

type ListReturnType<T> = [T[], number]

type UserListReturnType = ListReturnType<UserWithIncludedRegionAndRoleType>
type AnnouncementListReturnType = ListReturnType<AnnouncementType>
type VehicleListReturnType = ListReturnType<VehicleType>

export type {UserListReturnType, AnnouncementListReturnType, VehicleListReturnType}