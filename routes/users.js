const router = require('express').Router();
const { getUser, updateUser, deleteUser } = require('../controllers/users');

router.get('/users/me', getUser);
router.patch('/users/me', updateUser);
router.delete('/users/me', deleteUser);

module.exports = router;
