const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Enter the required credentials" });
    }

     const lowerEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: lowerEmail }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    let isPwdMatch = await bcrypt.compare(password, user.password);
    if (!isPwdMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    if(!process.env.MY_SECRET_KEY)
        throw new Error("JWT secret is not defined");

    const token = jwt.sign({ userId: user._id }, process.env.MY_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Logged in successfully",
      user: { email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ message: "Please fill the required fields" });

    const lowerEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: lowerEmail });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "User already exists, please login" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email: lowerEmail,
      password: hashedPassword,
    });
    await user.save();

    return res.status(201).json({
      message: "User registered successfully",
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login, register };
