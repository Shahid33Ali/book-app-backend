const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Acess Denied" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }
    req.user = user;
    next();
  });
};
module.exports = verifyToken;
