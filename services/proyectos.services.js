import { MongoClient,ObjectId } from "mongodb";

const MONGO_URI = "mongodb+srv://admin:admin@cluster0.mmpw3qu.mongodb.net/?appName=Cluster0";
const client = new MongoClient(MONGO_URI);
const nombredb = "AH20232CP1";
const coleccion = "projects";

const db = client.db(nombredb);

export async function crearProyecto(proyecto) 
{
  try {
    await client.connect();
    proyecto._id = new ObjectId();
    await db.collection(coleccion).insertOne(proyecto);
    return proyecto;
  } catch (err) {
    console.error("Error al crear proyecto:", err);
    throw new Error (err);
  }
}

export async function obtenerRecientes(n = 5) {
  try {
    await client.connect();
    return await db.collection(coleccion).find({}).sort({ _id: -1 }).limit(n).toArray();
  } catch (err) {
    console.error("Error al obtener proyectos recientes:", err);
    throw new Error(err);
  }
}

export async function obtenerTodos() {
  try {
    await client.connect();
    const proyectos = await db.collection(coleccion).find({}).toArray();
    return proyectos;
  } catch (err) {
    console.error("Error al obtener proyectos:", err);
    throw new Error(err);
  }
}

export async function obtenerProyectosPorFiltro(nombre, seccion) {
  try {
    await client.connect();
    const filtro = {};
    if (nombre) {
      filtro.name = { $regex: nombre, $options: "i" };
    }
    if (seccion) {
      filtro.section = seccion; 
    }
    const proyectos = await db.collection(coleccion).find(filtro).toArray();

    return proyectos;
  } catch (err) {
    console.error("Error al filtrar proyectos:", err);
    throw new Error(err);
  }
}

export async function obtenerProyectoPorId(id) {
  try {
    await client.connect();
    const proyecto = await db.collection(coleccion).findOne({ _id: new ObjectId(id) });
    return proyecto;
  } catch (err) {
    console.error("Error al obtener proyecto por ID:", err);
    throw new Error(err);
  }
}

export async function actualizarProyecto(datosActualizados) {
  try {
    await client.connect();
    const resultado = await db.collection(coleccion).updateOne(
      { _id: new ObjectId(datosActualizados.id) },
      { $set: datosActualizados }
    );
    return resultado;
  } catch (err) {
    console.error("Error al actualizar proyecto:", err);
    throw new Error(err);
  }
}

export async function borrarProyecto(id) {
  try {
    await client.connect();
    const resultado = await db.collection(coleccion).deleteOne({ _id: new ObjectId(id) });
    return resultado;
  } catch (err) {
    console.error("Error al borrar proyecto:", err);
    throw new Error(err);
  }
}
