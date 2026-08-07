import {Router} from "express";
import {roleController} from "../../controllers/role.controller.js";

const router = Router()

router.get("/", roleController.getList)

export const adminRolesRouter = router