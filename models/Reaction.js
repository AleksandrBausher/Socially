const { Schema, model, Types } = require("mongoose");
const moment  = require("moment")

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId, 
      default: () => new Types.ObjectId(), 
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //formatting the date using the moment.js package
      get: (date) => {
        return moment(date).format("MM/DD/YYYY hh:mm:ss");
      },
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);


module.exports = reactionSchema;