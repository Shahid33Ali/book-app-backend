const express = require("express");
const { User } = require("../models/user-model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const find = await User.findOne({ username });
    if (!find) {
      return res
        .status(401)
        .json({ message: "There is no admin of this username" });
    }
    const isMatch = await bcrypt.compare(password, find.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "There is no admin of this username or password" });
    }
    const token = jwt.sign(
      { id: find._id, username: find.username, role: find.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Authentication Successfull",
      token,
      user: {
        username: find.username,
        role: find.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "there is an error" });
  }
});
module.exports = router;
