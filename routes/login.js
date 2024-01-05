const express = require("express");
const router = express.Router();
const User = require("../modals/user");
const { body, query, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post(
  "",
  [
    // these are the check points to validate the entered data
    body("email", "Please enter the valid credentials").isEmail(),
    body("password", "Please enter the valid credentials").isLength({ min: 8 }),
  ],
  async (req, res) => {
    //  This is to check whether the error occured or not
    const errors = validationResult(req);
    // console.log(errors)

    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // if (Number.isInteger(loginmethod)){
    //     let existUser = await User.findOne({ mobile : mobile });
    // }
    // else{
    //     let existUser = await User.findOne({ email: email });
    // }

    let existUser = await User.findOne({ email: email });

    if (!existUser) {
      return res
        .status(400)
        .json({ error: "Please Enter the valid credentials" });
    }
    console.log(existUser.password);
    let passCompare = await bcrypt.compare(password, existUser.password);
    if (!passCompare) {
      return res
        .status(400)
        .json({ error: "Please Enter the valid credentials" });
    }

    //  Sending the authorized token
    let authToken = jwt.sign({ user: { id: existUser.id } }, "ykashyap");
    console.log(authToken);
    console.log("WELcome : ", existUser.name);

    res.json({ authToken });
  }
);

module.exports = router;



// #6210e1
// #0f0821
// #202233
// #f67f21
