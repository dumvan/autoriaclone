import type {User} from "../../prisma/src/generated/prisma/client.js";
import {TokenPairType} from "./TokenType.js";
import {UserWithIncludedRegionAndRoleType} from "./UserWithIncludeDataType.js";

type SignResultType = {user: UserWithIncludedRegionAndRoleType, tokenPair: TokenPairType}
type SignInType = Pick<User, "email" | "password">

export type {SignResultType, SignInType}