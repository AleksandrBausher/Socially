const router = require("express").Router();

//importing all the functions to assign it to the endpoints
const {
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
    createUser,
    addfriend,
    removeFriend,
} = require("../../controllers/userController");


//assigning the /api/users/ endpoint to the get all users function and create a new user function
router.route("/").get(getAllUsers).post(createUser);


//assigning the /api/users/userId endpoint to the get a specific user and delete a specific user
router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);


//assigning the /api/users/userId/friends/friendId endpoint to a add a friend associated to the user and also delete the fridn using the friend user id
router.route("/:userId/friends/:friendId").post(addfriend).delete(removeFriend);

module.exports = router;