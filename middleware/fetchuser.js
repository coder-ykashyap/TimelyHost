const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  let token = req.header("auth-token");
  // console.log(token);

  if (!token) {
    res.status(401).send("Invalid Token !");
  }

  const data = jwt.verify(token, "ykashyap");
  if (!data) {
    res.status(401).send("Token has been changed");
  }

  req.user = data.user
  
  next();
};

module.exports = fetchUser;
