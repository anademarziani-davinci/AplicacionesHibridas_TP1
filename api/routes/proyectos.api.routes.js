import express from "express";
import * as proyectosController from "../controller/proyectos.api.controller.js";

const router = express.Router();
router.get("/proyectos", proyectosController.obtenerProyectos);
router.get("/proyectos/:id", proyectosController.obtenerProyectoPorId);

router.post("/proyectos", proyectosController.agregarProyecto);
router.put("/proyectos/:id", proyectosController.reemplazarProyecto);
router.patch("/proyectos/:id", proyectosController.actualizarProyecto);
router.delete("/proyectos/:id", proyectosController.borrarProyecto);

export default router;