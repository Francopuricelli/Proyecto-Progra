import express from 'express';
import ProductRouter from './routes/product.routing.js';
import UserRouter from './routes/user.routing.js'
import envs from './config/envs.js'
import sequelize from './config/db-sequalize.js';
import {join, __dirname} from './utils/index.js'
import cors from 'cors'

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
app.use(express.static(join(__dirname,"../public"))); // Sirve archivos estáticos desde la carpeta 'public'
app.use(express.json()); // Permite que el servidor entienda JSON en las solicitudes
app.use("/products", ProductRouter); 
app.use("/users", UserRouter);




///Inicializacion del servidor

const startServer = async () => {
await initializeConnection()

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});
}

startServer();

