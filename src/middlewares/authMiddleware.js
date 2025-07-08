// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_aqui';

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não informado' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token inválido' });

  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

module.exports = authMiddleware;