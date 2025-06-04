import express from 'express';
import path from 'path';
import url from 'url';
import fs from 'fs';




//settings

const app= express();
const filename = url.fileURLToPath(import.meta.url); // Obtiene el nombre del archivo actual
const dirname = path.dirname(filename); // Obtiene el directorio del archivo actual
const port = 3000


//middlewares
app.use(express.static(path.join(dirname,"../public"))); // Sirve archivos estáticos desde la carpeta 'public'
app.use('/assets', express.static(path.join(dirname, '../assets')));


app.get('/catalogo', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(dirname, '../js/db.json'), 'utf-8');
    const productos = JSON.parse(data);
    res.json(productos);
    console.log(productos);
  } catch (error) {
    res.status(500).send('Error leyendo el archivo JSON');
  }

});


///Inicializacion del servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});