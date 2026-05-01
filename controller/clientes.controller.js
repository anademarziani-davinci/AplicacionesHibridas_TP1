import * as clientesService from "../services/clientes.services.js"
import * as clientesViews from "../views/clientes.views.js"


export async function obtenerTodos(req, res) {
    try {
        const clientes = await clientesService.obtenerClientes()
        const html = clientesViews.crearListaClientes(clientes,"Clientes")
        res.send(html)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener clientes" });
    }
}

export async function verProyectosDeCliente(req, res) {
    try{
        const clienteId = req.params.id;
        const proyectos = await clientesService.obtenerProyectosDeCliente(clienteId);
        const cliente = await clientesService.obtenerClientePorId(clienteId);
        const html = clientesViews.verProyectosDeCliente(cliente, proyectos);
        res.send(html);
    }catch(error){
        res.status(500).json({ message: "Error al obtener proyectos del cliente" });
    }
    
}