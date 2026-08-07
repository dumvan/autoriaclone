import {Router} from "express";
import {commonMiddleware} from "../../middlewares/common.middleware.js";
import {User} from "../../../prisma/src/generated/prisma/client.js";
import {userService} from "../../services/user.service.js";
import {userController} from "../../controllers/user.controller.js";
import {UserValidator} from "../../vaildators/user.validator.js";
import {BanValidator} from "../../vaildators/ban.validator.js";
import {QueryValidator} from "../../vaildators/query.validator.js";
import {userMiddleware} from "../../middlewares/user.middleware.js";
import {UserPermissionsEnum} from "../../enums/permissionEnums/user.permissions.enum.js";

const router = Router()

router.get('/', commonMiddleware.validateUserPermission(UserPermissionsEnum.READ), commonMiddleware.validateQuery(QueryValidator.userValidator), userController.getList)
router.post('/', commonMiddleware.validateUserPermission(UserPermissionsEnum.MANAGE), commonMiddleware.validateBody(UserValidator.createUser), userMiddleware.checkEmailTaken, userController.create)
router.get('/:userId', commonMiddleware.validateUserPermission(UserPermissionsEnum.READ), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "Користувача", "userId"), userController.get)
router.delete('/:userId', commonMiddleware.validateUserPermission(UserPermissionsEnum.MANAGE), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "Користувача", "userId"), userMiddleware.checkActionWithSelf, userController.delete)
router.patch('/:userId', commonMiddleware.validateUserPermission(UserPermissionsEnum.MANAGE), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "Користувача", "userId"), userMiddleware.checkActionWithSelf, commonMiddleware.validateBody(UserValidator.updateUser), userController.update)
router.post('/:userId/ban', commonMiddleware.validateUserPermission(UserPermissionsEnum.MODERATE), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "Користувача", "userId"), userMiddleware.checkActionWithSelf, commonMiddleware.validateBody(BanValidator.validator), userController.ban)
router.post('/:userId/unban', commonMiddleware.validateUserPermission(UserPermissionsEnum.MODERATE), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "Користувача", "userId"), userMiddleware.checkActionWithSelf, userController.unban)
router.post('/:userId/activate', commonMiddleware.validateUserPermission(UserPermissionsEnum.MANAGE), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "Користувача", "userId"), userMiddleware.checkActionWithSelf, userController.activate)
router.post('/:userId/deactivate', commonMiddleware.validateUserPermission(UserPermissionsEnum.MANAGE), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "Користувача", "userId"), userMiddleware.checkActionWithSelf, userController.deactivate)
router.post('/:userId/verify', commonMiddleware.validateUserPermission(UserPermissionsEnum.MANAGE), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "Користувача", "userId"), userMiddleware.checkActionWithSelf, userController.verify)
router.post('/:userId/unverify', commonMiddleware.validateUserPermission(UserPermissionsEnum.MANAGE), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "Користувача", "userId"), userMiddleware.checkActionWithSelf, userController.unverify)
router.post('/:userId/assign-manager', commonMiddleware.validateUserPermission(UserPermissionsEnum.MANAGE), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "Користувача", "userId"), userMiddleware.checkActionWithSelf, userController.assignManager)
router.post('/:userId/unassign-manager', commonMiddleware.validateUserPermission(UserPermissionsEnum.MANAGE), commonMiddleware.validateId("userId", "mysql"), commonMiddleware.validateEntityExisting<User>(userService, "Користувача", "userId"), userMiddleware.checkActionWithSelf, userController.unassignManager)

export const adminUsersRouter = router