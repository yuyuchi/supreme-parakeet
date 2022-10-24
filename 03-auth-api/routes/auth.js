const router = require("express").Router();
const User = require("../model/Users");
const { DataValidation } = require("../dataValidation");
const bcrypt = require("bcryptjs");

// app.use('/api/register')
router.post("/register", async (req, res) => {
  // Validate that the body content matches our requirements
  const { error } = DataValidation.registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check to make sure that user doesn't exist
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already registered");

  // encrypt password
  const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: encryptedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  const { error } = DataValidation.loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the email exists
  const userInDB = await User.findOne({ email: req.body.email });
  if (!userInDB) return res.status(400).message("Email not registered");

  const validPassword = await bcrypt.compare(
    req.body.password,
    userInDB.password
  );
  if (!validPassword) return res.status(401).send("Invalid password");

  res.status(200).send("Logged in");
});

module.exports = router;
