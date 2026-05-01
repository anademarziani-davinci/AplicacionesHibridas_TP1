import express from "express"
import * as proyectosController from "../controller/proyectos.controller.js"

const router = express.Router()


router.get("/proyectos", proyectosController.Obtener)


export default router;