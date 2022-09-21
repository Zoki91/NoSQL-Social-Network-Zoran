// Importing Mongoose and Moment JS
const { Schema, model, Types } = require('mongoose');
const moment = require('moment')

// Creating the Reaction Schema
const reactionSchema = new Schema({
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
    default: Date.now,
    get: createdAtVal => moveMessagePortToContext(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
}},
{
  toJSON:{
      virtuals: true,
      getters: true
  },
  id: false
}
)

// Creating the Thought Schema

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => moveMessagePortToContext(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },

  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
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

thoughtSchema.
virtual('reactionCount')
.get(function () {
  return this.reactions.length;
});

// Create's the Thought model using the thoughtSchema
const Thought = model('Thought', thoughtSchema);

// Exports the Thought model
module.exports = Thought;