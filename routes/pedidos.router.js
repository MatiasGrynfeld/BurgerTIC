import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente



// Ruta para manejar operaciones relacionadas con usuarios
// Esta ruta debe ir antes que las rutas que usan :id para evitar conflictos
router.get("/usuario", verifyToken, PedidosController.getAllUsuarios); // Ejemplo, asume que tienes un controlador para obtener usuarios

// Aplicar `verifyToken` globalmente a las rutas que requieren autenticación
// Si deseas que todas las rutas requieran autenticación, puedes hacerlo aquí
router.use(verifyToken);

// Ruta para obtener un pedido por ID
// Esta ruta requiere autenticación
router.get("/:id", PedidosController.getPedidoById);

// Ruta para aceptar un pedido
// Solo administradores pueden aceptar pedidos
router.post("/:id/aceptar", verifyAdmin, PedidosController.aceptarPedido);

// Ruta para comenzar un pedido
// Solo administradores pueden comenzar pedidos
router.post("/:id/comenzar", verifyAdmin, PedidosController.comenzarPedido);

// Ruta para entregar un pedido
// Solo administradores pueden entregar pedidos
router.post("/:id/entregar", verifyAdmin, PedidosController.entregarPedido);

// Ruta para eliminar un pedido
// Solo administradores pueden eliminar pedidos
router.delete("/:id", verifyAdmin, PedidosController.deletePedido);

export default router;

