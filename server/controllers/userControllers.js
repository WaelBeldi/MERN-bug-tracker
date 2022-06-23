const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../config/.env" });
const User = require("../models/userModel");
const Bug = require("../models/bugModel");

exports.signin = async (req, res) => {
  const { email, password } = req.body
  try {
      const existingUser = await User.findOne({ email })
      if(!existingUser) return res.status(404).json({ message : "User does not exist"})

      const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
      if(!isPasswordCorrect) return res.status(400).json({ message : "Bad credentials" })

      const token = jwt.sign({
          email: existingUser.email,
          role: existingUser.role,
          id: existingUser._id,
      }, process.env.SECRET_KEY, { expiresIn: "24h" })
      res.status(200).json({result: existingUser, token})

  } catch (error) {
      res.status(500).json({ message: "Login server error" })   
  }
}

exports.signup = async (req, res) => {
  const { email, password, userName, role } = req.body
  try {
      const existingUser = await User.findOne({ email })
      if(existingUser) res.status(401).json({ message: "User already exists"})
  
      const hashedPassword = await bcrypt.hash(password, 12)
      const result = await User.create({ email, password: hashedPassword, userName, role })
      const token = jwt.sign({
          email: result.email,
          role: result.role,
          id: result._id,
      }, process.env.SECRET_KEY, { expiresIn: "24h" })
      
      res.status(200).json({result: result, token})
  } catch (error) {
      res.status(500).json({ message: error})   
  }
}

exports.fetchDevs = async (req, res) => {
  try {
    const devs = await User.find({ role: "developer" });
    res.status(200).json(devs);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

/*----------Get users with roles----------*/
exports.fetchUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["developer", "tester", ""] } });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

/*----------Create a new user----------*/
exports.createUser = async (req, res) => {
  try {
    // Check if this user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('User already exists!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        });
        // if (!req.body.username) return res.status(404).json({message : "Field required"})
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        res.send(user);
    }
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

/*----------Update user----------*/
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  const existingUser = await User.findById(id)

  if (!(existingUser)) {
    return res.status(404).json({ msg: `No user with id: ${id}` });
  }

  const salt = await bcrypt.genSalt(10);
  hashedPassword = await bcrypt.hash(user.password, salt);
  console.log(hashedPassword);

  if (typeof user.userName !== "undefined") {
    existingUser.userName = user.username;
  }
  if (typeof user.email !== "undefined") {
    existingUser.email = user.email;
  }
  if (typeof user.password !== "undefined") {
    existingUser.password = user.hashedPassword;
  }
  if (typeof user.role !== "undefined") {
    existingUser.role = user.role;
  }
  
//   if (!user.userName || !user.email || !user.password || !user.role) {
//     req.flash('error', 'One or more fields are empty');
//     // return res.redirect('/edit');
// }

  const updatedUser = await User.findByIdAndUpdate(id, {userName: user.userName, email: user.email, password: hashedPassword, role: user.role}, { new: true });
  console.log("update",updatedUser);
  res.json(updatedUser);
};

/*----------Delete user----------*/
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  const userBugs = await Bug.find({assigned: user.userName})
  if (!user) {
    return res.status(404).json({ msg: `No user with id: ${id}` });
  }

  // await Bug.updateMany({assigned: user.userName}, { $set: { assigned: user.creator } })

  // await Bug.deleteMany({assigned: user.userName});
  await User.findByIdAndRemove(id);
  res.json({ message: "User deleted successfully." });
};