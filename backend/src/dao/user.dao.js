import User from '../models/user.js';

const UserDao = {
  async create({ username }) {
    return await User.create({ username });
  },

  async getByUsername(username) {
    return await User.findOne({ where: { username } });
  },

  async getById(id) {
    return await User.findByPk(id);
  },

  

  async getAll() {
    return await User.findAll();
  },

  async delete(id) {
  const user = await this.getById(id);
  if (!user) return null;
  await User.destroy({ where: { id } });
  return true;
}
};

export default UserDao;