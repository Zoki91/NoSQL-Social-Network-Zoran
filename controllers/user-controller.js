// Importing the Models
const { User, Thought } = require("../models");

// Homework Activities 25 & 26 CRUD Subdoc & 23 Subdoc-Population

const userController = {
  // GET All Users
  getAllUser(req, res) {
    User.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // GET One User by ID
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: 'No "User" found with this ID!' });
        } else {
          return res.json(userData);
        }
      })
      .catch((err) => res.status(400).json(err));
  },

  // Create a New User
  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err));
  },

  // Update a User by ID
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: 'No "User" found with this ID!' });
        } else {
          return res.json(userData);
        }
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a User
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: 'No "User" found with this ID!' });
        }

        // Delete a User and delete that User's Thoughts
        return Thought.deleteMany({ _id: { $in: userData.thoughts } });
      })
      .then(() => {
        res.json({ message: '"User" and "Thoughts" deleted!' });
      })
      .catch((err) => res.json(err));
  },

  // Adding a Friend : /api/users/:userId/friends/:friendId
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: 'No "User" found with this ID!' });
        } else {
          return res.json(userData);
        }
      })
      .catch((err) => res.status(400).json(err));
  },

  // Deleting a Friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          return res
            .status(404)
            .json({ message: 'No "User" found with this ID!' });
        } else {
          return res.json(userData);
        }
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
