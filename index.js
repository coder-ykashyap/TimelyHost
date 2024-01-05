const ConnectToMongo = require("./database/database.js")
const cors = require("cors")
const path = require("path")


ConnectToMongo();

const express = require('express')
const app = express()
const port = process.env.PORT ||  5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,"build")))

app.use("/", require("./routes/home"))
app.use("", require("./routes/today"))
app.use("", require("./routes/tomorrow"))
app.use("/form",require("./routes/form"))
app.use("/login", require("./routes/login"))
app.use("/signup",require("./routes/signup"))


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })