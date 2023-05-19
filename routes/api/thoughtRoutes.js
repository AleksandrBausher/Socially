const router = require("express").Router();


//importing the thought functions
const {
  getThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");


//assigning the /api/thoughts/ endpoint to the get all thoughts function and create thought function
router.route("/").get(getThoughts).post(createThought);

//assigning the /api/thoughts/thoughtId endpoint to the get specific thought function and update specific thought and delete a specific thought
router
.route("/:thoughtId")
.get(getOneThought)
.put(updateThought)
.delete(deleteThought);


//assigning the /api/thoughts/thoughtId/reactions endpoint to the create a reaction associate to the specific thought
router.route("/:thoughtId/reactions").post(addReaction);

//assigning the /api/thoughts/thoughtId/reactions/reactionId endpoint to the delete a specific reaction
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;