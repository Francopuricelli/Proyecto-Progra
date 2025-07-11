import bcrypt from 'bcrypt'
import AdminDao from '../dao/admin.dao.js'


const AdminController = {
    async login(req, res){
      const {username, user_password} = req.body
      const admin = await AdminDao.getByUsername(username);
      
      if (!admin) { 
        return res.status(401).json({error: "usuario no encontrado"})
      }
      
      const passwordMatch = await bcrypt.compare(user_password, admin.user_password)
    
      if (!passwordMatch) {
        return res.status(401).json({error: "contrasena incorrecta"})
      }

      res.json({message: "Bienvenido ", admin})
    },

    async register(req, res){
 try {
      const { username, user_password } = req.body;
      if (!username || !user_password) {
        return res.status(400).json({error: 'faltan campos requeridos'})
      }

      const hashedPassword= await bcrypt.hash(user_password, 10)
      const newAdmin = await AdminDao.create({ username, user_password: hashedPassword });
      res.status(201).json(newAdmin);
    } catch (error) {
      res.status(500).json({ error: "Error creando usuario" });
    }
  },
}

export default AdminController
