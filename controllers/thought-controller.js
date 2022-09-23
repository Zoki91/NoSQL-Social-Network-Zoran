// Importing the Models
const { Thought, User } = require("../models");

// Homework Activities 25 & 26 CRUD Subdoc

// GET all Thoughts
const thoughtController = {
  // get all Thoughts
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((thoughtData) => {
        return res.json(thoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // GET One Thought by ID
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thoughtData) => {
        if (!thoughtData) {
          return res
            .status(404)
            .json({ message: 'No "Thought" found with this ID!' });
        } else {
          return res.json(thoughtData);
        }
      })
      .catch((err) => res.status(400).json(err));
  },

  // Create a Thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thoughtData) => {
        if (!thoughtData) {
          return res
            .status(404)
            .json({ message: "Thought created but no user with this id!" });
        }
        res.json({ message: "Thought successfully created!" });
      })
      .catch((err) => res.json(err));
  },

  // Update a Thought by ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res
            .status(404)
            .json({ message: 'No "Thought" found with this ID!' });
        } else {
          return res.json(thoughtData);
        }
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a Thought by ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res
            .status(404)
            .json({ message: 'No "Thought" found with this ID!' });
        } else {
          return User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          );
        }
      })
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: 'No "User" found with this ID!' });
        } else {
          return res.json({ message: "Successfully Deleted" });
        }
      })
      .catch((err) => res.status(400).json(err));
  },

  // Create A Reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((data) => {
        if (!data) {
          return res
            .status(404)
            .json({ message: 'No "Thought" found with this ID!' });
        } else {
          return res.json(data);
        }
      })
      .catch((err) => res.status(400).json(err));
  },

  // Deleting a Reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;
