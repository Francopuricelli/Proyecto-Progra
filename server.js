const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;




app.get('/catalogo', (req, res) => {
  try {
    const data = fs.readFileSync('js/db.json', 'utf-8');
    const productos = JSON.parse(data);
    res.json(productos);
    console.log(productos);
  } catch (error) {
    res.status(500).send('Error leyendo el archivo JSON');
  }

});


///Inicializacion del servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



