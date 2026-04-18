const router = require('express').Router();
const userControllers = require('../controllers/userControllers');
const middlewareControllers = require('../controllers/middlewareControllers');

//GET ALL USERS
router.get("/", middlewareControllers.verifyToken, userControllers.getAllUsers);

//DELETE USER
router.delete("/:id", middlewareControllers.verifyToken, userControllers.deleteUser);


module.exports = router;