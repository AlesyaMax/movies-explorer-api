const router = require('express').Router();
const { getUser, updateUser } = require('../controllers/users');
const { validateUpdatedUser } = require('../middlewares/validation');

router.get('/users/me', getUser);
router.patch('/users/me', validateUpdatedUser, updateUser);

module.exports = router;
