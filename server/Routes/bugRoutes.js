const express = require("express");

const {
  getBugs,
  createBug,
  updateBug,
  deleteBug,
  resolveBug,
  devRespond,
} = require("../controllers/bugsControllers");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.get('/', getBugs)
router.post('/', isAuth, createBug)
router.put('/:id', isAuth, updateBug)
router.delete('/:id', isAuth, deleteBug)
router.put('/:id/isResolved', isAuth, resolveBug)
router.put('/:id/devRespond', isAuth, devRespond)

module.exports = router;