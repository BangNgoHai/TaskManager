const router = require('express').Router();
const authControllers = require('../controllers/authControllers');
const middlewareControllers = require('../controllers/middlewareControllers');

//REGISTER
router.post("/register", authControllers.registerUser);

//LOGIN
router.post("/login", authControllers.loginUser);

//REFRESH
router.post("/refresh", authControllers.requestRefreshToken);

//LOGOUT
router.post("/logout", middlewareControllers.verifyToken, authControllers.userLogout);

module.exports = router;