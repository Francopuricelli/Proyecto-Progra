import express from 'express';
import ProductRouter from './routes/product.routing.js';
import AdminRouter from './routes/admin.routing.js';
import UserRouter from './routes/user.route.js';
import ViewRouter from './routes/product.view.routes.js';
import SaleRouter from './routes/sales.route.js';
import sequelize from './config/db-sequalize.js';
import {join, __dirname} from './utils/index.js'
import cors from 'cors';
import path from 'path';


//settings
const app= express();
const port = 3000


const initializeConnection= async () =>{
  try{
    await sequelize.sync()
  }catch(err){
    console.error(err)
  }
}


//middlewares
app.use(cors());
app.use(express.static(join(__dirname, "../../frontend")));
app.use(express.static(join(__dirname,"../public"))); // Sirve archivos estáticos desde la carpeta 'public'
app.use(express.json()); // Permite que el servidor entienda JSON en las solicitudes
app.use("/api/products", ProductRouter); 
app.use("/api/admins", AdminRouter);
app.use("/api/users", UserRouter);
app.use("/api/views", ViewRouter);
app.use("/api/sales", SaleRouter);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "../../frontend/index.html")); 
});

app.get("/home.html", (req, res) => {
  res.sendFile(join(__dirname, "../../frontend/home.html")); 
});


app.set("view engine", "ejs");
app.set("views", join(__dirname, "../src/views"));

app.use(express.static(path.join(__dirname, './public')));






///Inicializacion del servidor

const startServer = async () => {
await initializeConnection()

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});
}

startServer();

