const mongoose = require("mongoose");
const Bug = require("../models/bugModel");

/*----------Get all bug issues----------*/
exports.getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.status(200).json(bugs);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

/*----------Create a new bug issue----------*/
exports.createBug = async (req, res) => {
  const bug = req.body;
  const newBug = new Bug({
    ...bug,
    creator: req.userId,
    createdOn: new Date().toISOString(),
  });

  try {
    await newBug.save();
    res.status(201).json(newBug);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

/*----------Update a bug issue----------*/
exports.updateBug = async (req, res) => {
  const { id } = req.params;
  const bug = req.body;

  if (!(await Bug.findById(id))) {
    return res.status(404).json({ msg: `No bug issue with id: ${id}` });
  }

  const updatedBug = await Bug.findByIdAndUpdate(id, bug, { new: true });
  res.json(updatedBug);
};

/*----------Delete a bug issue----------*/
exports.deleteBug = async (req, res) => {
  const { id } = req.params;

  const bug = await Bug.findById(id);
  if (!bug) {
    return res.status(404).json({ msg: `No bug issue with id: ${id}` });
  }

  await Bug.findByIdAndRemove(id);
  res.json({ message: "Bug issue deleted successfully." });
};

/*----------Mark a bug issue as resolved/unresolved----------*/
exports.resolveBug = async (req, res) => {
  const { id } = req.params;

  const bug = await Bug.findById(id);
  if (!bug) {
    return res.status(404).json({ msg: `No bug issue with id: ${id}` });
  }

  const updatedBug = await Bug.findByIdAndUpdate(
    id,
    { isResolved: !bug.isResolved },
    { new: true }
  );
  res.json(updatedBug);
};

/*----------Dev response----------*/
exports.devRespond = async (req, res) => {
  const { id } = req.params;
  const { devResponse } = req.body;

  const bug = await Bug.findById(id);
  if (!bug) {
    return res.status(404).json({ msg: `No bug issue with id: ${id}` });
  }

  const updatedBug = await Bug.findByIdAndUpdate(
    id,
    { devResponse: devResponse },
    { new: true }
  );
  res.json(updatedBug);
};
