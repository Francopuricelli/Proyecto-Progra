import express from 'express';
import userRouter from './routes/user.route.js';
import envs from './config/envs.js'
import sequelize from './config/db-sequalize.js';
import {join, __dirname} from './utils/index.js'


//settings

const app= express();
// const filename = url.fileURLToPath(import.meta.url); // Obtiene el nombre del archivo actual
// const dirname = path.dirname(filename); // Obtiene el directorio del archivo actual
const port = 3000


const initializeConnection= async () =>{
  try{
    await sequelize.sync()
  }catch(err){
    console.error(err)
  }
}

// Configuración de la base de datos SQLite
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'users'
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//   } else {
//     console.log('Connected to the MySQL database');
//   }
// });



//middlewares
app.use(express.static(join(__dirname,"../public"))); // Sirve archivos estáticos desde la carpeta 'public'
app.use(express.json()); // Permite que el servidor entienda JSON en las solicitudes
app.use("/users", userRouter); // Usa las rutas definidas en user.route.js


// Consultas de la base de datos

// app.get('/create', (req, res) => {
//   const createQuery = `
//     CREATE TABLE IF NOT EXISTS users (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       username VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL
//     )
//   `;



//   db.query(createQuery, (err, results) => {
//     if (err) {
//       console.error('Error creating table:', err);
//       res.status(500).send('Error creating table');
//     } else {
//       res.send('Table created successfully');
//     }
//   });
// });

//   app.get('/users/:id', (req, res) => {
//     const { id } = req.params;
//     const selectQuery = 'SELECT * FROM users WHERE id = ?';
//     db.query(selectQuery, [id], (err, results) => {
//       if (err) {
//         res.status(500).send('Error fetching user');
//       } else {
//         res.json(results);
//       }
//     });
//   });

//   app.post('/users', (req, res) => {
//     const { username, email } = req.body;
//     const insertQuery = 'INSERT INTO users (username, email) VALUES (?, ?)';
//     db.execute(insertQuery, [username, email], (err, results) => {
//       if (err) {
//         res.status(500).send('Error inserting user');
//       } else {
//         res.status(201).send('User created successfully');
//         res.json(results);
//       }
//     });
//   });











// app.get('/catalogo', (req, res) => {
//   try {
//     const data = fs.readFileSync(path.join(dirname, '../js/db.json'), 'utf-8');
//     const productos = JSON.parse(data);
//     res.json(productos);
//     console.log(productos);
//   } catch (error) {
//     res.status(500).send('Error leyendo el archivo JSON');
//   }
// });

// app.post('/api/login', (req, res) => {
//   console.log('BODY recibido:', req.body); 
//   const { username } = req.body; 

//   // Aquí puedes agregar la lógica de autenticación
//   if (username === 'admin') {
//     res.json({ message: 'Login successful' });
//   } else {
//     res.status(401).json({ message: 'Invalid credentials' });
//   }
// });

///Inicializacion del servidor

const startServer = async () => {
await initializeConnection()

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});
}

startServer();

