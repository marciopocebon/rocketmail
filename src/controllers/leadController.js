const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middlewares/auth');
const Lead = require('../models/lead');

const router = express.Router();
router.use(authMiddleware);

module.exports = (app) => {
  router.get('/', async (req, res) => {
    const leads = await Lead.find({});

    res.send({ leads });
  });

  app.use('/leads', router);
};
