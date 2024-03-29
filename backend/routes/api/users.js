// backend/routes/api/users.js
const express = require("express");
const router = express.Router();

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
// backend/routes/api/users.js
// ...
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
// ...

// backend/routes/api/users.js
// ...
const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// backend/routes/api/users.js
// ...

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;
  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  await setTokenCookie(res, user);

  return res.json({
    user: user.toSafeObject(),
  });
});

router.get("/allUsers", async (req, res, next) => {
  const allUsers = await User.findAll({});
  return res.json({ allUsers });
});

module.exports = router;
