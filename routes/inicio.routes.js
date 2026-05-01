import express from "express"
import * as inicioController from "../controller/inicio.controller.js"

const router = express.Router()

router.get("/", inicioController.renderInicio)

export default router
