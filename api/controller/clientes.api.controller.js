import * as service from "../../services/clientes.services.js"     


export async function agregarCLiente(req, res) 
{
  try {
    const cliente = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        foto: req.body.foto
    }

    if( cliente.foto === undefined || cliente.nombre === undefined || cliente.descripcion === undefined) {
        res.status(400).json({ message: "Faltan campos obligatorios: nombre, descripcion y foto" });
        return;
    }

    const respuesta = await service.crearCliente(cliente);
    res.status(201).json(respuesta);
  } catch (err) {
    console.error("Error al crear cliente:", err);
    res.status(500).json({ message: "Error al crear cliente" });
  }
}

export async function obtenerClientes(req, res)     {
  try {
    const clientes = await service.obtenerClientes();
    if( clientes.length > 0) {
        res.json(clientes);
    }       
    else {
        res.status(404).json({ message: "No se encontraron clientes" })
    }
  } catch (err) {
    console.error("Error al obtener clientes:", err);
    res.status(500).json({ message: "Error al obtener clientes" });
  }
}

export async function obtenerClientePorId(req, res) {
   try {
        const id = req.params.id
        const respuesta = await service.obtenerClientePorId(id)
        if (respuesta) {
            res.json(respuesta)
        }   else {  
            res.status(404).json({ message: "Cliente no encontrado" })
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener cliente" });
    }
}



export async function crearProyectoParaCliente(req, res) {
  try {
    const clienteId = req.params.id;
    const proyecto = {
        name: req.body.name,
        description: req.body.description,
        link: req.body.link,
        img: req.body.img,
        technologies: req.body.technologies,
        section: req.body.section
    };
    const respuesta = await service.crearProyectoParaCliente(clienteId, proyecto);
    res.status(201).json(respuesta);
  } catch (err) {
    console.error("Error al crear proyecto para cliente:", err);
    res.status(500).json({ message: "Error al crear proyecto para cliente" });
  }
}


export async function obtenerProyectosDeCliente(req, res) {
  try {
    const clienteId = req.params.id;
    const proyectos = await service.obtenerProyectosDeCliente(clienteId);
    res.json(proyectos);
  } catch (err) {
    console.error("Error al obtener proyectos del cliente:", err);
    res.status(500).json({ message: "Error al obtener proyectos del cliente" });
  }
}
