import Router from "express";
import UsuariosController from "../controllers/usuarios.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/makeadmin", verifyToken, verifyAdmin, UsuariosController.makeadmin);

export default router;

