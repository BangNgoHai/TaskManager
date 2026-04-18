const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const tokenHeader = req.headers.token;
  console.log('--- New Request ---');
  console.log('Received token header:', tokenHeader);

  if (tokenHeader) {
    const accessToken = tokenHeader.split(' ')[1];
    console.log('Extracted accessToken:', accessToken);

    if (!accessToken || accessToken === 'undefined') {
      console.log('Token is undefined, rejecting with 401.');
      return res.status(401).json("Access token is missing or undefined.");
    }

    jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
      if (err) {
        console.error('JWT Verification Error:', err.message);
        return res.status(403).json("Token is not valid! Reason: " + err.message);
      }
      
      console.log('Token verified successfully for user:', user);
      req.user = user;
      next(); // Proceed to the next middleware/controller
    });
  } else {
    console.log('No token header found. Rejecting with 401.');
    return res.status(401).json("You are not authenticated");
  }
};

module.exports = { verifyToken };
