import express from "express"
import * as clientesController from "../controller/clientes.controller.js"

const router = express.Router()


router.get("/clientes", clientesController.obtenerTodos)
router.get("/clientes/:id", clientesController.verProyectosDeCliente)


export default router;