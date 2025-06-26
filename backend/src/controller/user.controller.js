import UserDao from '../dao/user.dao.js'

const UserController = {
    async login(req, res){
      const {username, user_password} = req.body
      const user = await UserDao.getByUsername(username);
      
      if (!user || user.user_password !== user_password) { 
        return res.status(401).json({error: "credenciales incorrectas"})
      }

      res.json({message: "Bienvenido ", user})
    },

    async register(req, res){
 try {
      const { username, user_password } = req.body;
      const newUser = await UserDao.create({ username, user_password });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Error creando usuario" });
    }
  },
}

export default UserController

