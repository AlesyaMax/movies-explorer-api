const router = require('express').Router();
const { validateSignup, validateSignin } = require('../middlewares/validation');
const { createUser, login } = require('../controllers/users');
const { auth, clearCookie } = require('../middlewares/auth');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);
router.use('/signout', auth, clearCookie);

module.exports = router;
