const { Thought, User } = require("../models");

module.exports = {
//method to featch all the thoughts in the database
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //method to get a specific thought using the thought id posted in the request
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      //if the thought id is not present in the database
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought was found with that ID!" });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

//method to create a thought using the body posted in the request
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      // if the given user id in the request is not found in the database 
      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought created but found no user with that id" });
      }
      res.json("Thought created!");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  //method to update the thought using the posted thought id 
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      //if the thought id is not present in the database
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //method for deleting the thought using the given thought id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      //if the given thought id is not present in the database
      if (!thought) {
        return res
          .status(404)
          .json({ message: "Can not find any thought with the ID" });
      }

      //to delete the thought id in the user data thoughts array
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thpughtId } },
        { new: true } 
      );

      //if the given user id is not present in the database
      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought created but can not find any user with the ID" });
      }
      res.json({ message: "Thought successfully deleted!" });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //method to create the reacton in the thought data in reaction array
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      //if the given thought id is not present in the database
      if (!thought) {
        return res.status(404).json({ mesasage: "Can not find any thought with the ID" });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //method to delete the reaction from the thought array in the thought data
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      //if the given thought id is not present in the database
      if (!thought) {
        return res.status(404).json({ message: "Can not find any thought with the ID" });
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};