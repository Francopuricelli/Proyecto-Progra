import userDao from "../dao/user.dao.js";

const UserController = {
  async getAll(req, res) {
    try {
      const users = await userDao.getAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Error getting users" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await userDao.getById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "no se encontro el usuario." });
      }
    } catch (err) {
      res.status(500).json({ error: "error encontrando el usuario." });
    }
  },

  async create(req, res) {
    try {
      const { username } = req.body;
      const newUser = await userDao.create(username);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: "Error creating user" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { username } = req.body;
      const updatedUser = await userDao.update(id, username);
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: "Error updating user" });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      await userDao.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: "Error deleting user" });
    }
  }
};

export default UserController;