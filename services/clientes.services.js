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

export async function obtenerRecientes(n = 5) {
  try {
    await client.connect();
    return await db.collection(coleccionClientes).find({}).sort({ _id: -1 }).limit(n).toArray();
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
    console.log("Obteniendo cliente por ID:", clienteId);
    const cliente = await db.collection(coleccionClientes).findOne({ _id: new ObjectId(clienteId) });
    
    return cliente;
  } catch (err) {
    console.error("Error al obtener cliente:", err);
    throw new Error(err);
  }
}

export async function obtenerProyectosDeCliente(clienteId) {
  try {
    await client.connect();
    const proyectos = await db.collection(coleccionProyectos).find({ clienteId: new ObjectId(clienteId) }).toArray();
    return proyectos;
  } catch (err) {
    console.error("Error al obtener proyectos del cliente:", err);
    throw new Error(err);
  }
}

export async function crearProyectoParaCliente(clienteId, proyecto) {
  try {
    await client.connect();
    proyecto._id = new ObjectId();
    proyecto.clienteId = new ObjectId(clienteId);
    proyecto.fechaCreacion = new Date();
    
    await db.collection(coleccionProyectos).insertOne(proyecto);
    return proyecto;
  } catch (err) {
    console.error("Error al crear proyecto para cliente:", err);
    throw new Error(err);
  }
}

