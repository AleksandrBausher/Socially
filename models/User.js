const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      //regex to validate the email
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid emal address",
      ],
    },

    thoughts: [
      {
        //associating the thought
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
      {
        //associating the friends
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//creating a virtual friendcount function to count the friends associated to the user
userSchema.virtual("friendCount").get(function () {
  return `${this.friends.length}`;
});

//converting the schema to model
const User = model("user", userSchema);

module.exports = User;