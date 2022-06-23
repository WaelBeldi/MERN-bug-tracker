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
const {bugRules, validator} = require("../middlewares/Validator")

const router = express.Router();

router.get('/', getBugs)
router.post('/', bugRules(), validator, isAuth, createBug)
router.put('/:id', bugRules(), validator, isAuth, updateBug)
router.delete('/:id', isAuth, deleteBug)
router.put('/:id/isResolved', isAuth, resolveBug)
router.put('/:id/devRespond', isAuth, devRespond)

module.exports = router;