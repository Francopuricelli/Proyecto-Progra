import Admin from '../models/admin.js';

const AdminDao = {
  async create({ username, user_password }) {
    return await Admin.create({ username, user_password });
  },

  async getByUsername(username) {
    return await Admin.findOne({ where: { username } });
  },

  async getAll() {
    return await Admin.findAll();
  },

  async delete(id) {
    const admin = await Admin.findByPk(id);
    if (!admin) return null;
    await Admin.destroy();
    return true;
  }
};

export default AdminDao;