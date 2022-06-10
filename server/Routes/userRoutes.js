const express = require("express");

const {
  signin,
  signup,
  fetchDevs,
} = require("../controllers/userControllers");

const router = express.Router();

router.post('/signin', signin)
router.post('/signup', signup)
router.get('/dev', fetchDevs)

module.exports = router;
