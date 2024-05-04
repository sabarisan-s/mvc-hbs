const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const { errorEvents } = require("./middleware/erroEvents");
const {logEvents }= require("./middleware/logEvents");
const path =require('path')

app.set("view engine", "hbs");
app.engine("hbs", engine({ extname: ".hbs", defaultLayout: "main" }));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));

//log request events
app.use((req, res, next) => {
  let message = `${req.url} ${req.header.origin} ${req.method}`;
  logEvents(message, "reqLog.txt");
  next()
});
const rootRouter = require("./routes/root");
app.use(rootRouter)

//log error events
app.use(errorEvents);

//server port 3000
app.listen(3000, (e) => {
  if (e) {
    console.log(e.message);
  }
  console.log("Running");
});
