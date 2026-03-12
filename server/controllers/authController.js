const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: "User created" });
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  console.log("=== Login attempt ==="); ///---------------
  console.log("Request body:", req.body); ///---------------
  console.log("JWT_SECRET env var:", process.env.JWT_SECRET); ///---------------

  try {
    const user = await User.findOne({ username });

    console.log("User found:", user); ///---------------

    if (!user) {
      console.log("User not found"); ///---------------

      return res.status(401).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(password, user.password);

    console.log("Password valid?", valid); ///---------------

    if (!valid) {
      console.log("Wrong password"); ///---------------

      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("Token generated:", token); ///---------------

    res.json({ token });
  } catch (err) {
    res.status(500).json(err);

    console.log("Error in login:", err); ///---------------
  }
};

module.exports = {
  register,
  login,
};
