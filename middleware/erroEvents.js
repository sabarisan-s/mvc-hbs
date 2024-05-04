const { logEvents } = require("./logEvents");

async function errorEvents(err, req, res, next) {
  let message = `${err.name} ${err.message}\n`;
  res.status(200).send(err.message);
  console.error(err.stack);
  await logEvents(message, "errorLog.txt");
  next();
}

module.exports = { errorEvents };
