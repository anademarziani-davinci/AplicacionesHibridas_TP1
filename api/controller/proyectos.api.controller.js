import * as service from "../../services/proyectos.services.js"
import * as clientesService from "../../services/clientes.services.js"


export async function actualizarProyecto(req, res) {
    const id = req.params.id
    try {
        const proyectoExistente = await service.obtenerProyectoPorId(id)
        if (!proyectoExistente) {
            return res.status(404).json({ message: "Proyecto no encontrado" })
        }
        const proyecto = {}
        proyecto.id = id
        proyecto.name = req.body?.name ? req.body?.name : proyectoExistente?.name
        proyecto.description = req.body?.description ? req.body?.description : proyectoExistente?.description
        proyecto.link = req.body?.link ? req.body?.link : proyectoExistente?.link
        proyecto.img = req.body?.img ? req.body?.img : proyectoExistente?.img
        proyecto.technologies = req.body?.technologies ? req.body?.technologies : proyectoExistente?.technologies
        proyecto.section = req.body?.section ? req.body?.section : proyectoExistente?.section

        await service.actualizarProyecto(proyecto);
        res.json({ message: `Proyecto con id ${id} actualizado` })

    }catch (error) {    
        res.status(500).json({ message: `Error al actualizar el producto ${id}` })
    }
}

export async function reemplazarProyecto(req, res) {
    const id = req.params.id
    try {
        const proyecto = {}
        proyecto.id = id
        proyecto.name = req.body?.name ? req.body?.name : proyectoExistente?.name
        proyecto.description = req.body?.description ? req.body?.description : proyectoExistente?.description
        proyecto.link = req.body?.link ? req.body?.link : proyectoExistente?.link
        proyecto.img = req.body?.img ? req.body?.img : proyectoExistente?.img
        proyecto.technologies = req.body?.technologies ? req.body?.technologies : proyectoExistente?.technologies
        proyecto.section = req.body?.section ? req.body?.section : proyectoExistente?.section

        await service.actualizarProyecto(proyecto);
        res.json({ message: `Proyecto con id ${id} actualizado` })

    }catch (error) {    
        res.status(500).json({ message: `Error al actualizar el producto ${id}` })
    }
}

export async function borrarProyecto(req, res) {
    try {
        const id = req.params.id
        await service.borrarProyecto(id)
        res.json({ message: `Proyecto con id ${id} eliminado` })
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
}

export async function agregarProyecto(req, res) {
    try {
        const clienteInput = req.body.cliente;
        let cliente;

        if (clienteInput?._id) {
            const existente = await clientesService.obtenerClientePorId(clienteInput._id);
            if (existente) {
                cliente = { _id: existente._id, nombre: existente.nombre, foto: existente.foto };
            } else {
                const nuevo = await clientesService.crearCliente({
                    nombre: clienteInput.nombre ?? "Anónimo",
                    foto: clienteInput.foto ?? "https://i.pravatar.cc/300?img=2",
                    descripcion: clienteInput.descripcion ?? ""
                });
                cliente = { _id: nuevo._id, nombre: nuevo.nombre, foto: nuevo.foto };
            }
        } else if (clienteInput) {
            const nuevo = await clientesService.crearCliente({
                nombre: clienteInput.nombre ?? "Anónimo",
                foto: clienteInput.foto ?? "https://i.pravatar.cc/300?img=2",
                descripcion: clienteInput.descripcion ?? ""
            });
            cliente = { _id: nuevo._id, nombre: nuevo.nombre, foto: nuevo.foto };
        } else {
            const anonimo = await clientesService.crearCliente({
                nombre: "Anónimo",
                foto: "https://i.pravatar.cc/300?img=2",
                descripcion: ""
            });
            cliente = { _id: anonimo._id, nombre: anonimo.nombre, foto: anonimo.foto };
        }

        const proyecto = {
            name: req.body.name,
            description: req.body.description,
            link: req.body.link,
            img: req.body.img,
            technologies: req.body.technologies,
            section: req.body.section,
            cliente: cliente
        }

        const respuesta = await service.crearProyecto(proyecto);
        await clientesService.agregarProyectoACliente(cliente._id, respuesta);
        res.status(201).json(respuesta)
    } catch (error) {
        console.error("Error al crear proyecto:", error);
        res.status(500).json({ message: error })
    }
}

export async function obtenerProyectos(req, res) {
    try {
        const { nombre, seccion } = req.query
        const tieneFiltroDeNombreOSeccion = nombre || seccion;
        let respuesta;
        if(tieneFiltroDeNombreOSeccion) 
            respuesta = await service.obtenerProyectosPorFiltro(nombre, seccion);
        else
            respuesta = await service.obtenerTodos();

        if( respuesta.length > 0) {
            res.json(respuesta);
        }       
        else {
            res.status(404).json({ message: "No se encontraron proyectos" })
        }

    } catch (error) {
        console.error("Error al obtener proyectos:", error);
        res.status(500).json({ message: error })
    }
}

export async function obtenerProyectoPorId(req, res) {
    try {
        const id = req.params.id
        const respuesta = await service.obtenerProyectoPorId(id)
        if (respuesta) {
            res.json(respuesta)
        }   else {  
            res.status(404).json({ message: "Proyecto no encontrado" })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
}