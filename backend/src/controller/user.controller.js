import bcrypt from 'bcrypt'
import UserDao from '../dao/user.dao.js'


const UserController = {
    async login(req, res){
      const {username, user_password} = req.body
      const user = await UserDao.getByUsername(username);
      
      if (!user) { 
        return res.status(401).json({error: "usuario no encontrado"})
      }
      
      const passwordMatch = await bcrypt.compare(user_password, user.user_password)
    
      if (!passwordMatch) {
        return res.status(401).json({error: "contrasena incorrecta"})
      }

      res.json({message: "Bienvenido ", user})
    },

    async register(req, res){
 try {
      const { username, user_password } = req.body;
      if (!username || !user_password) {
        return res.status(400).json({error: 'faltan campos requeridos'})
      }

      const hashedPassword= await bcrypt.hash(user_password, 10)
      const newUser = await UserDao.create({ username, user_password: hashedPassword });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Error creando usuario" });
    }
  },
}

export default UserController
