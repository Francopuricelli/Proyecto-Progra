import User from '../models/user.js';

const UserDao = {
  async create({ username, user_password }) {
    return await User.create({ username, user_password });
  },

  async getByUsername(username) {
    return await User.findOne({ where: { username } });
  },

  async getAll() {
    return await User.findAll();
  },

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return true;
  }
};

export default UserDao;