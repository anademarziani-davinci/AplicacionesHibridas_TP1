import { MongoClient,ObjectId } from "mongodb";

const MONGO_URI = "mongodb+srv://admin:admin@cluster0.mmpw3qu.mongodb.net/?appName=Cluster0";
const client = new MongoClient(MONGO_URI);
const nombredb = "AH20232CP1";
const coleccionClientes = "clientes";
const coleccionProyectos = "projects";

const db = client.db(nombredb);

export async function crearCliente(cliente) 
{
  try {
    await client.connect();
    
    let clienteACrear = {
        _id: new ObjectId(),
        nombre: cliente.nombre,
        foto: cliente.foto,
        descripcion: cliente.descripcion,
        fechaCreacion: new Date()
    };
    await db.collection(coleccionClientes).insertOne(clienteACrear);
    return clienteACrear;
  } catch (err) {
    console.error("Error al crear cliente:", err);
    throw new Error(err);
  }
}

export async function obtenerRecientes(top = 5) {
  try {
    await client.connect();
    return await db.collection(coleccionClientes).find({}).sort({ _id: -1 }).limit(top).toArray();
  } catch (err) {
    console.error("Error al obtener clientes recientes:", err);
    throw new Error(err);
  }
}

export async function obtenerClientes() {
  try {
    await client.connect();
    const clientes = await db.collection(coleccionClientes).find({}).toArray();
    return clientes;
  } catch (err) {
    console.error("Error al obtener clientes:", err);
    throw new Error(err);
  }
}

export async function obtenerClientePorId(clienteId) {
  try {
    await client.connect();
    const id = typeof clienteId === "object" ? clienteId._id : clienteId;
    const cliente = await db.collection(coleccionClientes).findOne({ _id: new ObjectId(id) });
    return cliente;
  } catch (err) {
    console.error("Error al obtener cliente:", err);
    throw new Error(err);
  }
}

export async function obtenerProyectosDeCliente(clienteId) {
  try {
    await client.connect();
    const proyectos = await db.collection(coleccionProyectos).find({ "cliente._id": new ObjectId(clienteId) }).toArray();
    return proyectos;
  } catch (err) {
    console.error("Error al obtener proyectos del cliente:", err);
    throw new Error(err);
  }
}

export async function agregarProyectoACliente(clienteId, proyecto) {
  try {
    await client.connect();
    await db.collection(coleccionClientes).updateOne(
      { _id: new ObjectId(clienteId) },
      { $push: { proyectos: {
        _id: proyecto._id,
        name: proyecto.name,
        description: proyecto.description,
        img: proyecto.img,
        section: proyecto.section,
        technologies: proyecto.technologies,
        link: proyecto.link
      }}}
    );
  } catch (err) {
    console.error("Error al agregar proyecto a cliente:", err);
    throw new Error(err);
  }
}

export async function crearProyectoParaCliente(clienteId, proyecto) {
  try {
    await client.connect();
    const cliente = await db.collection(coleccionClientes).findOne({ _id: new ObjectId(clienteId) });
    if (!cliente) throw new Error("Cliente no encontrado");

    proyecto._id = new ObjectId();
    proyecto.cliente = { _id: cliente._id, nombre: cliente.nombre, foto: cliente.foto };
    proyecto.fechaCreacion = new Date();

    await db.collection(coleccionProyectos).insertOne(proyecto);
    await db.collection(coleccionClientes).updateOne(
      { _id: new ObjectId(clienteId) },
      { $push: { proyectos: {
        _id: proyecto._id,
        name: proyecto.name,
        description: proyecto.description,
        img: proyecto.img,
        section: proyecto.section,
        technologies: proyecto.technologies,
        link: proyecto.link
      } } }
    );
    return proyecto;
  } catch (err) {
    console.error("Error al crear proyecto para cliente:", err);
    throw new Error(err);
  }
}

