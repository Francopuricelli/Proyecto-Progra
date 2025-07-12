

export const newProductChecker = async (req, res, next) => {try {
        const { nombre, tipo, precio, plataforma,desarrollador,genero,lanzamiento,stock,idioma } = req.body;
        if (!nombre || !tipo || !precio || !plataforma || !desarrollador || !genero || !lanzamiento || !stock || !idioma) {
            return res.status(400).json({ message: "Completa todos los campos" });
        }
        if (precio < 1) {
            return res.status(400).json({ message: "El precio debe ser mayor que 0" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "Debe subir una imagen." });
        }
        next(); 
    } catch (error) {
        res.status(500).json({ message: "Error al validar el producto", error: error.message });
        console.log(error);
    }
}

export const productUpdateChecker = async (req, res, next) => {
    try {
        const { nombre, tipo, precio, plataforma,desarrollador,genero,lanzamiento,stock,idioma } = req.body;
        if(!nombre){
            return res.status(400).json({ message: "No hay nombre" });
        }
        if(!tipo){
            return res.status(400).json({ message: "No hay tipo" });
        }
        if(!desarrollador){
            return res.status(400).json({ message: "No hay desarrollador" });
        }
        if(!genero){
            return res.status(400).json({ message: "No hay genero" });
        }
        if(!idioma){
            return res.status(400).json({ message: "No hay idioma" });
        }
        if(!lanzamiento){
            return res.status(400).json({ message: "No hay lanzamiento" });
        }
        if(!stock){
            return res.status(400).json({ message: "No hay stock" });
        }
        if(!precio){
            return res.status(400).json({ message: "No hay precio" });
        }
        if(!plataforma){
            return res.status(400).json({ message: "No hay plataforma" });
        }
        if (precio < 1) {
            return res.status(400).json({ message: "El precio debe ser mayor que 0" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Error al validar el producto", error: error.message });
    }
};