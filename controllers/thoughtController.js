const { Thought, User } = require("../models");

module.exports = {

  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
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


  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
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

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "Can not find any thought with the ID" });
      }
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thpughtId } },
        { new: true } 
      );
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

  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { runValidators: true, new: true }
      );
      if (!thought) {
        return res.status(404).json({ mesasage: "Can not find any thought with the ID" });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "Can not find any thought with the ID" });
      }

      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};