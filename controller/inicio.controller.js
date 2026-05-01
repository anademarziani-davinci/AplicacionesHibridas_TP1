import * as proyectosService from "../services/proyectos.services.js"
import * as clientesService from "../services/clientes.services.js"
import * as inicioView from "../views/inicio.views.js"

export async function renderInicio(req, res) {
    try {
        const [clientes, proyectos] = await Promise.all([
            clientesService.obtenerRecientes(5),
            proyectosService.obtenerRecientes(5)
        ])
        res.send(inicioView.renderInicio(clientes, proyectos))
    } catch (error) {
        res.status(500).json({ message: "Error al cargar el inicio" })
    }
}
