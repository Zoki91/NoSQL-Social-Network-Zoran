// Importing Mongoose and Moment JS
const { Schema, model, Types } = require('mongoose');


// Creating the Reaction Schema
const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },

  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },

  username: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now(),
 
}},
{
  toJSON:{
      getters: true,
  },
  id: false,
}
)

// Creating the Thought Schema

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  username: {
    type: String,
    required: true
  },
  reactions: [ReactionSchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
}
);


// Create a Virtual Property `reactionCount` that gets and sets reaction count
// Homework 22 Stu Virtuals

ThoughtSchema.
virtual('reactionCount')
.get(function () {
  return this.reactions.length;
});

// Create's the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// Exports the Thought model
module.exports = Thought;