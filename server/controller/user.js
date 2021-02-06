const User = require('../models/User');

exports.createUser = async (req, res, next) => {
  try {
    const createdUser = await User.create(req.body);
    res.status(201).json(createdUser);
  } catch (error) {
    next(error);
  }
}