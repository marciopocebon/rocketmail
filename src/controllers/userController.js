const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, process.env.SECRET_KEY, {
    expiresIn: 86400,
  });
}

module.exports = (app) => {
  router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    // Check user exists
    if (!user)
      return res.status(401).send({ error: 'User was not found' });

    // Check password
    if (!await bcrypt.compare(password, user.password))
      return res.status(401).send({ error: 'Incorrect email/password' });

    // Remove password
    user.password = undefined;

    res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  });

  router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // E-mail in use
    if (await User.findOne({ email }))
      return res.status(401).send({ error: 'E-mail in use, choose another' });

    try {
      const user = await User.create({ name, email, password });

      // Remove password
      user.password = undefined;

      return res.send({
        user,
        token: generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(401).send({ error: 'Registration failed' });
    }
  });

  app.use('/', router);
};
