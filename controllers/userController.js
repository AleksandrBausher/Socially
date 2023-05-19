const { User, Thought } = require("../models");
const { findOneAndUpdate } = require("../models/User");

module.exports = {

  //method to get all the users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //mthod to get only one user
  async getOneUser(req, res) {
    try {
      const oneUser = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      //if the given id is not available in the database
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
      //method to update the user data using the given user id
      const updateUser = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      //if the given user id is not available in the database
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

  //method to create a new user using the given body in the request posted
  async createUser(req, res) {
    try {
      const createOneUser = await User.create(req.body);
      res.json(createOneUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //deleteing the user in the database according to the given userid in the request
  async deleteUser(req, res) {
    try {
      const deleteOneUserAndThought = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      //if the given userid is not available in the database
      if (!deleteOneUserAndThought) {
        return res.status(404).json({ message: "Can not find any user with the ID"});
      }

      //also deleteing the thought asssciated to the user
      await Thought.deleteMany({
        _id: { $in: deleteOneUserAndThought.thoughts },
      });
      res.json({ message: "Perfect! Deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //method to add a friend to the friends array in the userdata using the userid posted in the request
  async addfriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      //if the user id is not present in the database
      if (!user) {
        return res.status(404).json({ message: "Can not find any user with the ID" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json;
    }
  },

  //method to delete the user from the friends array in the given user data of the posted user id
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      //if th user id is not present in the database
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