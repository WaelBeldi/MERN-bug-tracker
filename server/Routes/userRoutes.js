const express = require("express");

const {
  signin,
  signup,
  fetchDevs,
  fetchUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userControllers");
const isAuth = require("../middlewares/isAuth");
const {loginRules, userRules, validator} = require("../middlewares/Validator")

const router = express.Router();

router.post('/signin', loginRules(), validator, signin)
// router.post('/signup', signup)
router.get('/dev', fetchDevs)

router.get('/', fetchUsers)
router.post('/', userRules(), validator, isAuth, createUser)
router.put('/:id', isAuth, updateUser)
router.delete('/:id', isAuth, deleteUser)

module.exports = router;
