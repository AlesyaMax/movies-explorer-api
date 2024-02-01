const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/user');
const {
  MONGO_DUPLICATE_ERROR_CODE,
  SALT_ROUNDS,
  duplicateErrorMessage,
  authErrorMessage,
  userNotFoundMessage,
} = require('../config');
const generateToken = require('../utils/jwt');
const NotFoundError = require('../utils/NotFoundError');
const DuplicateError = require('../utils/DuplicateError');
const AuthError = require('../utils/AuthError');
const ValidationError = require('../utils/ValidationError');

const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const newUser = await User.create({
      email,
      password: hash,
      name,
    });
    const token = generateToken({
      email: newUser.email,
      name: newUser.name,
      _id: newUser._id,
    });
    return res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
      .send({
        email: newUser.email,
        name: newUser.name,
        _id: newUser._id,
      });
  } catch (err) {
    if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      return next(new DuplicateError(duplicateErrorMessage));
    }
    if (err instanceof mongoose.Error.ValidationError) {
      return next(new ValidationError(err.message));
    }
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
      .select('+password')
      .orFail(new AuthError(authErrorMessage));
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new AuthError(authErrorMessage);
    }
    const token = generateToken({
      email: user.email,
      name: user.name,
      _id: user._id,
    });
    return res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
      .send({ email: user.email, name: user.name });
  } catch (err) {
    return next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id }).orFail(
      () => new NotFoundError(userNotFoundMessage),
    );
    return res.send({ email: user.email, name: user.name });
  } catch (err) {
    return next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    ).orFail(new NotFoundError(userNotFoundMessage));
    return res.send(updatedUser);
  } catch (err) {
    if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
      return next(new DuplicateError(duplicateErrorMessage));
    }
    if (err instanceof mongoose.Error.ValidationError) {
      return next(
        new ValidationError(
          `${Object.values(err.errors)
            .map((error) => error.message)
            .join(', ')}`,
        ),
      );
    }
    return next(err);
  }
};

module.exports = {
  createUser,
  login,
  getUser,
  updateUser,
};
