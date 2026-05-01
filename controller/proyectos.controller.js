import * as proyectosServices from "../services/proyectos.services.js"
import * as proyectosView from "../views/proyectos.views.js"


export async function Obtener(req, res) {
    try {
        const { nombre, seccion } = req.query;
        const proyectos = (nombre || seccion)
            ? await proyectosServices.obtenerProyectosPorFiltro(nombre, seccion)
            : await proyectosServices.obtenerTodos();
        const html = proyectosView.crearListaProyectos(proyectos, { nombre, seccion });
        res.send(html);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener proyectos" });
    }
}