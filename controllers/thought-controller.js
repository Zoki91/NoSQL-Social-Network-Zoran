// Importing the Models
const { User, Thought } = require("../models");

// Homework Activities 25 & 26 CRUD Subdoc

const thoughtController = {
  // GET all Thoughts
  getAllThought(req, res) {
    Thought.find({})
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(err));
  },

  // GET One Thought by ID
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
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

  // Create a Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: 'No "User" found with this ID!' })
          : res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Update a Thought by ID
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
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
