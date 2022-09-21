// Importing Mongoose
const { Schema, model } = require("mongoose");

// Homework Activities 23 Subdoc Population

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      // Validating Email Address with Mongoose - https://thewebdev.info/2022/03/16/how-to-validate-email-syntax-with-mongoose/
      // match: [
      //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //   "Please fill a valid email address",
      // ],
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],

    friends: [
      {
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


// Create a Virtual Property `friendCount` that gets and sets reaction count
// Homework 22 Stu Virtuals

userSchema.
virtual('friendCount')
.get(function () {
  return this.friends.length;
});

// Create's the User model using the userSchema
const User = model('User', userSchema);

// Exports the User model
module.exports = User;