const { check, validationResult } = require("express-validator");

const loginRules = () => [
    check("email", "Please enter a valid email.").notEmpty().isEmail(),
    check("password", "Please enter a password.").notEmpty().isLength({ min: 6 }),
]

const userRules = () => [
    check("userName", "Username is required.").notEmpty(),
    check("email", "Please enter a valid email.").notEmpty().isEmail(),
    check("password", "Please enter a password with 6 or more characters.").notEmpty().isLength({ min: 6}),
    check("role", "Role is required.").notEmpty()
]

const bugRules = () => [
    check("title", "Title is required.").notEmpty(),
    check("version", "Version is required.").notEmpty(),
    check("priority", "Priority is required.").notEmpty(),
    check("assigned", "Assigned is required.").notEmpty(),
]

const validator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({errors:errors.array()});
    }
    next();
  };

module.exports = validationForms = {
    loginRules,
    userRules,
    bugRules,
    validator
}