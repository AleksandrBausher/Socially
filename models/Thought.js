const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const moment = require("moment")

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, minlength: 1, maxlength: 280 },

    createdAt: {
      type: Date,
      default: Date.now,
//using moment.js to format the date according to the needs
      get: (date) => {return moment(date).format("MM/DD/YYYY hh:mm:ss")}
    },
    username: {

      type: String,
      required: true,
    },
    //associating reaction using the defined reaction schema
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//creating a virtual friendcount function to count the reactions associated to the thought
thoughtSchema.virtual("reactionCount").get(function () {
    return `${this.reactions.length}`;
  });

//converting the schema to model
  const Thought = model('thought', thoughtSchema);

  module.exports = Thought;