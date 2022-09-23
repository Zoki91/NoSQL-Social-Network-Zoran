// Homework Activities 25 & 26 CRUD Subdoc

// Importing Express
const router = require('express').Router()
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller')

// Set up GET All and POST Thoughts - '/api/thoughts'
router
.route('/')
.get(getAllThought)
.post(createThought)

// Set up GET One, Update by ID - '/api/thoughts/:thoughtId'
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// Set up POST Create Reaction - '/api/thoughts/:thoughtId/reactions'
router
    .route('/:thoughtId/reactions')
    .post(createReaction)

// Set up DELETE Reaction - '/api/:thoughtId/reactions/:reactionId'
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

// Set up GET All Thoughts
router
.route('/thoughts')
.get(getAllThought)


module.exports = router