const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check token in header
  if (!authHeader)
    return res.status(403).send({ ok: false, message: 'No token provided' });

  const parts = authHeader.split(' ');

  if (!parts.length === 2)
    return res.status(403).send({ ok: false, message: 'Token error' });

  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(403).send({ ok: false, message: 'Token malformatted' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).send({ ok: false, message: 'Token invalid' });

    req.userId = decoded.id;
    return next();
  });
};
