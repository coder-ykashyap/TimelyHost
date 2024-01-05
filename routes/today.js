const express = require("express");
const router = express.Router();
const ClassTable = require("../modals/class_Modal");

const getpass = () => {
  var currentTime = new Date();
  var currentOffset = currentTime.getTimezoneOffset();
  var ISTOffset = 330; // IST offset UTC +5:30

  var ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );

  timeobj = ISTTime;
  let date = timeobj.getDate();
  let month = timeobj.getMonth() + 1;
  let year = timeobj.getFullYear();
  let hour = timeobj.getHours();
  // let minutes = timeobj.getMinutes();
  let splchr = "@";

  let password = `${123321 * (date + month + year + hour)}${splchr}${
    hour + 123 * 123
  }`;
  return password;
};

const DayTeller = () => {
  let currentTime = new Date();

  let currentOffset = currentTime.getTimezoneOffset();

  let ISTOffset = 330; // IST offset UTC +5:30

  let ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );

  module.exports = ISTTime;

  const dateobj = ISTTime;
  day = dateobj.getDay();
  // console.log(day)

  switch (day) {
    case 1:
      dayname = "monday";
      break;
    case 2:
      dayname = "tuesday";
      break;
    case 3:
      dayname = "wednesday";
      break;
    case 4:
      dayname = "thursday";
      break;
    case 5:
      dayname = "friday";
      break;
    case 6:
      dayname = "saturday";
      break;
    case 0:
      dayname = "sunday";
  }

  return dayname;
};

router.post("/today", async (req, res) => {
  try {
    // let password = getpass();

    // console.log(
    //   "Req : ",
    //   req.headers.authorization,
    //   " Pass : ",
    //   password,
    //   " Match : ",
    //   req.headers.authorization === password,
    //   " class : ",
    //   req.body.class
    // );

    // if (!req.headers.authorization || req.headers.authorization !== password) {
    //   res.status(401).json({ error: "Authorization Failed" });
    //   return;
    // }

    let dayname = DayTeller();

    if (!req.body.class) {
      res.status(400).json({ error: "No class submitted" });
      return;
    }

    let clsObj = await ClassTable.findOne({ class: req.body.class });

    if (!clsObj) {
      res.status(400).json({ error: "No Class Found In Database" });
      return;
    }

    if (dayname == "sunday") {
      res.json([["Today", "is", "Sunday"]]);
      return;
    }

    todaytt = await clsObj[dayname];
    todaytt.splice(2, 0, ["It's", "Tea", "Break"]);

    res.json(todaytt);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Some Error Occured" });
  }
});

module.exports = router;
