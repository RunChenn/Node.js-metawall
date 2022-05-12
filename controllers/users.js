const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const User = require('../model/user');

const users = {
  getUsers: async (req, res) => {
    const user = await User.find();
    handleSuccess(res, user);
  },
};

module.exports = users;
