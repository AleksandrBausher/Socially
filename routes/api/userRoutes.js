const router = require("express").Router();

const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  createUser,
  addfriend,
  removeFriend,
} = require("../../controllers/userController");
router.route("/").get(getAllUsers).post(createUser);

router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);


router.route("/:userId/friends/:friendId").post(addfriend).delete(removeFriend);
module.exports = router;