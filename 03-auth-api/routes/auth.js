const route = require("express").Router();
const User = require("../model/Users");
const { DataValidation } = require("../dataValidation");

// app.use('/api/register')
route.post("/register", async (req, res) => {
  // Validate that the body content matches our requirements
  const { error } = DataValidation.registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = route;
