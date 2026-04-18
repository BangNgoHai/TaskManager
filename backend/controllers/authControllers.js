const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
let refreshTokens = [];

const authControllers = {
    //REGISTER
    registerUser: async (req, res) => {
        try {
            const { username, email, password } = req.body || {};

            if (!username || !email || !password) {
                return res.status(400).json({
                    message: "username, email and password are required",
                });
            }

            const existingUser = await User.findOne({
                $or: [{ username }, { email }],
            });

            if (existingUser) {
                return res.status(409).json({
                    message: "username or email already exists",
                });
            }

            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);

            //Create new user
            const newUser = new User({
                username,  //req.body is the data sent from the frontend(user input)
                email,
                password: hashed,  //hashed password is stored in the database
            });

            //Save user to database
            const user = await newUser.save();
            const { password: _password, ...safeUser } = user.toObject();
            res.status(201).json(safeUser);
        } catch (err) {
            if (err.name === "ValidationError") {
                return res.status(400).json({
                    message: "Invalid input data",
                    details: err.message,
                });
            }

            if (err.code === 11000) {
                return res.status(409).json({
                    message: "username or email already exists",
                });
            }

            res.status(500).json({
                message: "Internal server error",
                details: err.message,
            });
        }
    },

    //GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        }, process.env.JWT_ACCESS_KEY, {expiresIn: "30s" });
    },
    //GENERATE REFRESH TOKEN  
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin
        }, process.env.JWT_REFRESH_KEY, {expiresIn: "365d" });
    },

    //LOGIN
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({username: req.body.username});
            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                return res.status(400).json({
                    message: "Invalid password",
                });
            }

            if (user && validPassword) {
                //use generatefunktion above
                const accessToken = authControllers.generateAccessToken(user);
                const refreshToken = authControllers.generateRefreshToken(user);

                res.cookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path:"/",
                    sameSite: "strict",
                })

                const {password, ...others} = user._doc;
                res.status(200).json({...others, accessToken});
            }

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //REFRESHTOKEN
    requestRefreshToken: async(req, res) => {
        //take refresh token from user
        const refreshToken = req.cookies.refreshToken;
        //res.status(200).json(refreshToken);
        if(!refreshToken) return res.status(401).json("You' are not authenticated");
        if(!refreshTokens.includes(refreshToken)){
            return res.status(403).json("Refresh token is not valid");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if(err){
                console.log(err);
            }
            refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
            //Create new accesstoken, refresh token
            const newAccessToken = authControllers.generateAccessToken(user);
            const newRefreshToken = authControllers.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken", newRefreshToken, {
                httpOnly: true,
                secure: false,
                path:"/",
                sameSite: "strict",
            });
            res.status(200).json({accessToken: newAccessToken});
        })
    },

    //LOGOUT
    userLogout: async(req, res) => {
        res.clearCookie("refreshToken");

        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.statur(200).json("Logged out successfully");
    }
};

//STORE TOKEN
//1) LOCAL STORAGE: -> XSS ATTACK(User run Script on Web can take the Token from Localstorage)
//2) COOKIES: -> a bit safer but not optimal CSRF ATTACK (fakeweb ask user to type in the data)
//3) REDUX STORE -> ACCESSTOKEN save , HTTPONLY COOKIES -> REFRESHTOKEN save

//4)BFF PATTERN (BACKEND FOR FRONTEND)  hard to use

module.exports = authControllers;