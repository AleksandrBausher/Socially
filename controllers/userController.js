const { User, Thought } = require("../models");
const { findOneAndUpdate } = require("../models/User");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async getOneUser(req, res) {
    try {
      const oneUser = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!oneUser) {
        return res.status(404).json({ message: "Can not find any user with the ID" });
      }

      res.json(oneUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async updateUser(req, res) {
    try {
      const updateUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!updateUser) {
        return res
          .status(404)
          .json({ message: "Can not find any user with the ID" });
      }
      res.json(updateUser);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  async createUser(req, res) {
    try {
      const createOneUser = await User.create(req.body);
      res.json(createOneUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async deleteUser(req, res) {
    try {
      const deleteOneUserAndThought = await User.findOneAndDelete({
        _id: req.params.userId,
      });
      if (!deleteOneUserAndThought) {
        return res.status(404).json({ message: "Can not find any user with the ID"});
      }
      await Thought.deleteMany({
        _id: { $in: deleteOneUserAndThought.thoughts },
      });
      res.json({ message: "Perfect Deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async addfriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "Can not find any user with the ID" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json;
    }
  },
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        return res
          .status(404)
          .json({ message: "Can not find any user with the ID" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};