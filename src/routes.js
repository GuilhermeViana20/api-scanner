const express = require('express');
const router = express.Router();

const authMiddleware = require('./middlewares/authMiddleware');
const userController = require('./controllers/UserController');

router.post('/users/register', userController.register);
router.post('/users/login', userController.login);
router.get('/users/confirm-email/:token', userController.confirmEmail);
router.put('/users/:id', userController.update);

router.get('/users/profile', authMiddleware, (req, res) => {
  res.json({ message: 'Rota protegida', user: req.user });
});

module.exports = router;