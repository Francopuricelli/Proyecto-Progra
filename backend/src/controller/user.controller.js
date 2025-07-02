import UserDao from '../dao/user.dao.js'


const UserController = {
    async create(req, res){
      try{  
      const username = req.body
      const newUser = await UserDao.create(username);
      
      
        res.status(201).json({message: "Bienvenido ", newUser})
      
    }catch(error){
        console.error("Error al crear usuario:", error);
        res.status(500).json({error: "Error Creando el usuario"});
        

    }

}
}

export default UserController
