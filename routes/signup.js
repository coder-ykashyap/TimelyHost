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
    body("name", "Enter a valid Name").isLength({ min: 6 }),
    body("password", "Enter password of 8 characters").isLength({ min: 8 }),
    body("email", "Enter a valid Email").isEmail(),
    body("mobile", "Enter a valid Mobile").isMobilePhone().isLength({min :10,max :10}),
  ],

  async (req, res) => {

    try{
    //  This is to check whether the error occured or not
    const errors = validationResult(req);

    // console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }

    //   This is to check whether the email already exist in db or not
    let userE = await User.findOne({ email: req.body.email });
    let userM = await User.findOne({ mobile: req.body.mobile });

    // console.log(user)

    if (userE || userM) {
      return res.status(400).json({ "error ": "Email or Mobile Already Exist" });
    }

    //  pass hashing
    let salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password, salt);


    newuser = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
      mobile : req.body.mobile
    }).catch((err) => {
      res.json({ error: err });
    });


    // console.log("user Created")
    // res.send("user Created")

    //  Sending the authorized token
    let authToken = jwt.sign({ user: { id: newuser.id } }, "ykashyap");
    console.log(authToken);

    res.json({ authToken });
}
catch{
    res.send("Some Error Occured")
    console.log("Some Error Occured")
}
  }
);

module.exports = router;
