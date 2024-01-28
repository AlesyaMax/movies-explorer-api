const router = require('express').Router();
const { getUser, updateUser, deleteUser } = require('../controllers/users');
const { validateUpdatedUser } = require('../middlewares/validation');

router.get('/users/me', getUser);
router.patch('/users/me', validateUpdatedUser, updateUser);
router.delete('/users/me', deleteUser);

module.exports = router;
