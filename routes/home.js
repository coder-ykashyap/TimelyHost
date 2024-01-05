const express = require("express");
const router = express.Router();
const ClassTable = require("../modals/class_Modal");

const getpass = () => {
  let currentTime = new Date();
  let currentOffset = currentTime.getTimezoneOffset();
  let ISTOffset = 330; // IST offset UTC +5:30

  let ISTTime = new Date(
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

const lecTeller = () => {

  let currentTime = new Date();

  let currentOffset = currentTime.getTimezoneOffset();
  
  let ISTOffset = 330;   // IST offset UTC +5:30 
  
  let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
  
  const dateobj = ISTTime;
  day = dateobj.getDay();
  h = dateobj.getHours();
  m = dateobj.getMinutes();
  time = h * 100 + m;
  // console.log(time);

  if (time >= 800 && time < 900) {
    lectureNumber = 0;
  } else if (time >= 900 && time < 1005) {
    lectureNumber = 1;
  } else if (time >= 1005 && time < 1105) {
    lectureNumber = 2;
  } else if (time >= 1105 && time < 1125) {
    lectureNumber = 11;
  } else if (time >= 1125 && time < 1230) {
    lectureNumber = 3;
  } else if (time >= 1230 && time < 1335) {
    lectureNumber = 4;
  } else if (time >= 1335 && time < 1440) {
    lectureNumber = 5;
  } else if (time >= 1440 && time < 1540) {
    lectureNumber = 6;
  } else if (time >= 1540 && time < 1640) {
    lectureNumber = 7;
  } else {
    lectureNumber = 404;z
  }

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

  // console.log(lectureNumber);

  return [lectureNumber, dayname];
  // return [4, "monday"];
  // return [11, dayname];
};


router.get("",async(req,res)=>{
  res.sendFile(path.join(__dirname,"build","index.html"));
})






router.post("", async (req, res) => {
  try {
    let password = getpass();

    console.log(
      "Req : ",
      req.headers.authorization,
      " Pass : ",
      password,
      " Match : ",
      req.headers.authorization === password,
      " class : ",
      req.body.class
    );

    if (!req.headers.authorization || req.headers.authorization !== password) {
      res.status(401).json({ error: "Authorization Failed" });
      return;
    }

    let data = lecTeller();
    let dayname = data[1];
    let lectureNext = data[0];

    if (!req.body.class) {
      res.status(400).json({ error: "No class submitted" });
      return;
    }

    let clsObj = await ClassTable.findOne({ class: req.body.class });

    if (!clsObj) {
      res.status(400).json({ error: "No Class Found In Database" });
      return;
    }

    if (dayname === "sunday") {
      res.json({ error: "Today Is Sunday" });
      return;
    }

    todaytt = await clsObj[dayname];

    if (!todaytt) {
      res.json({ error: "Time Table Not Found" });
      return;
    }

    if (lectureNext === 404) {
      res.json({ error: "College Is Closed" });
      return;
    } else if (lectureNext == 2) {
      res.json([todaytt[1],["It's", "Tea", "Break"]]);

    } else if (lectureNext === 11) {
      res.json([["It's", "Tea", "Break"], todaytt[2]]);
      return;
    } else if (lectureNext === 0) {
      res.json([["College", "Is", "Closed"], todaytt[lectureNext]]);
      return;
    } else if (lectureNext === 7) {
      res.json([todaytt[lectureNext - 1], ["College", "will", "close"]]);
      return;
    } else {
      res.json([todaytt[lectureNext - 1], todaytt[lectureNext]]);
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Some Error Occured" });
  }
});



module.exports = router;
