import express from 'express';
import fs from 'fs';
const app = express();
const PORT = 3000;



app.get('/juegos', (req, res) => {
  try {
    const data = fs.readFileSync('db.json', 'utf-8');
    const juegos = JSON.parse(data);
    res.json(juegos);
  } catch (error) {
    res.status(500).send('Error leyendo el archivo JSON');
  }
  
  
});



//Inicializacion del servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


