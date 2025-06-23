import User from '../models/user.js';

const userDao = {
  async getAll() {
    const users = await User.findAll();
    return users;
  },

  async getById(id) {
    const user = await User.findByPk(id);
    return user;
  },

  async create(username) {
    const newUser = await User.create({ username});
    return newUser;
  },

  async update(id, username) {
    const user = await User.findByPk(id);
    if (!user) return null;
    user.username = username;
    await user.save();
    return user;
  },

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return true;
  }
};

export default userDao;