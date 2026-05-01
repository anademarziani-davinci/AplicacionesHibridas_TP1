import express from "express"
import proyectosRoutes from "../api/routes/proyectos.api.routes.js"
import clientesRoutes from "../api/routes/clientes.api.routes.js"
import proyectosRoutesWeb from "../routes/proyectos.routes.js"
import clientesRoutesWeb from "../routes/clientes.routes.js"
import inicioRoutesWeb from "../routes/inicio.routes.js"


const app = express();
const puerto = 2026;


app.use("/", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/",inicioRoutesWeb);
app.use("/",proyectosRoutesWeb);
app.use("/",clientesRoutesWeb);
app.use("/api", proyectosRoutes);
app.use("/api",  clientesRoutes);

app.listen(puerto, () =>console.log(`Funciando en puerto ${puerto}` ));
