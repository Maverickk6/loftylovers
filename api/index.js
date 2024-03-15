const express = require("express");

const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const crypto = require("crypto");

const nodemailer = require("nodemailer");

const cors = require("cors");
const jwt = require("jsonwebtoken");

const User = require("./models/user");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 3000;

mongoose
  .connect("mongodb+srv://maverick:edd12345@cluster0.aorybxh.mongodb.net/")
  .then(() => {
    console.log("connected to mongo database");
  })
  .catch((error) => {
    console.log("error connecting to mongo database");
  });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, email, password });
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    await newUser.save();

    //send verification email to registered user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error registering the user");
    res.status(500).json({ message: "Registration failed" });
  }
});

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "eddymav247@gmail.com",
      pass: "wpwnymbfsfpqkgte",
    },
  });
  const mailOptions = {
    from: "matchmake.com",
    to: email,
    subject: "Email Verification",
    text: `Please click on the link to verify your email : http://localhost:3000/verify/${verificationToken}`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("error sending the email ");
  }
};

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    res.status(200).json({ message: "Verified Successfully" });
  } catch (error) {
    console.log("Verification failed");
    res.status(500).json({ message: "User verification failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();

//login endpoint

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

//change gender endpoint
app.put("/users/:userId/gender", async (req, res) => {
  try {
    const { userId } = req.params;
    const { gender } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { gender: gender },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User gender updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "error updating user gender", error });
  }
});

app.put("/users/:userId/description", async (req, res) => {
  const { userId } = req.params;
  const { description } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        description: description,
      },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "User description updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error updating description" });
  }
});

//fetch user data
app.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching the user details" });
  }
});

//add a turnon

app.put("/users/:userId/turn-ons/add", async (req, res) => {
  try {
    const { userId } = req.params
    const { turnOn } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { turnOns: turnOn },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found " });
    }
    return res
      .status(200)
      .json({ message: "User turn on updated successfully", user });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error updating turn on info" });
  }
});

//remove a turnon

app.put("/users/:userId/turn-ons/remove", async (req, res) => {
  try {
    const { userId } = req.params;
    const { turnOn } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { turnOns: turnOn },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "Turn on removed successfully", user });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error updating turnon info" });
  }
});
