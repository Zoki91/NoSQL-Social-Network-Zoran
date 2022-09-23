// Homework Activities 25 & 26 CRUD Subdoc

// Importing Express
const router = require('express').Router()
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller')

// Set up router for GET and POST for '/api/user'
router
    .route('/')
    .get(getAllUser)
    .post(createUser)

// Set up GET one, PUT, and DELETE for '/api/user/:id'
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// Set up POST and DELETE for '/:userId/friends/:friendId'
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)  
    

module.exports = router