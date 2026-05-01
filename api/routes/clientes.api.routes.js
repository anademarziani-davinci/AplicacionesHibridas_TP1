import express from "express";
import * as clientesController from "../controller/clientes.api.controller.js";

const router = express.Router();
router.get("/clientes/:id", clientesController.obtenerClientePorId);
router.get("/clientes/:id/proyectos", clientesController.obtenerProyectosDeCliente);
router.get("/clientes", clientesController.obtenerClientes);

router.post("/clientes", clientesController.agregarCLiente);
router.post("/clientes/:id/proyectos", clientesController.crearProyectoParaCliente);

export default router;