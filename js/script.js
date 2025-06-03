import express from 'express';
import fs from 'fs';

const PORT = 3000;

const app = express();

app.get('/catalogo', (req, res) => {
  try {
    const data = fs.readFileSync('db.json', 'utf-8');
    const productos = JSON.parse(data);
    res.json(productos);
  } catch (error) {
    res.status(500).send('Error leyendo el archivo JSON');
  }

});


///Inicializacion del servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


