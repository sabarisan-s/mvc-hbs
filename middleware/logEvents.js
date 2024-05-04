const fs = require("fs");
const fsPromise = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");
const {format}=require('date-fns')

async function logEvents(message,logFile) {
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromise.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromise.appendFile(
      path.join(__dirname, "..", "logs", logFile),
      `${format(new Date(), "yyyy-MM-dd hh:mm:ss")} ${uuid()} ${message}\n`
    );
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = { logEvents };
