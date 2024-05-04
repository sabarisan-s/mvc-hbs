const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const { default: mongoose } = require("mongoose");
const Objectid = require("mongoose").Types.ObjectId;

router.get("/", async (req, res, next) => {
  res.render("index", { styleindex: true });
});

router.post("/form_create", async (req, res, next) => {
  let message;
  try {
    let user = await User.create({
      name: req.body.name,
      number: req.body.number,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user);
  } catch (err) {
    message = err.message;
    console.log(err.message, "not saved");
    return res.render("index", { message, styleindex: true });
  }
  console.log("saved");
  res.redirect("/login");
});

router.get("/login", (req, res, next) => {
  res.render("login", {
    stylelogin: true,
  });
});

router.post("/check_data", async (req, res, next) => {
  let message;
  let checkEmail = req.body.email;
  let checkPass = req.body.password;
  if (checkEmail == "") {
    message = "enter email";
    return res.render("login", {
      stylelogin: true,
      message,
    });
  } else if (checkPass == "") {
    message = "enter password";
    return res.render("login", {
      stylelogin: true,
      message,
    });
  }
  let user = await User.findOne({ email: checkEmail });

  if (user === null) {
    message = "invaild email";
    return res.render("login", {
      stylelogin: true,
      message,
    });
  }
  let dataId = user._id;
  let dataEmail = user.email;
  let dataPass = user.password;
  if (checkPass != dataPass) {
    message = "check invaild password";
    return res.render("login", {
      stylelogin: true,
      message,
    });
  } else if (checkEmail === dataEmail && checkPass === dataPass) {
    res.status(200).redirect(`dashboard/${dataId}`);
  }
});

router.get("/dashboard/:id", async (req, res, next) => {
  console.log(new Objectid(req.params.id));
  let user = await User.findOne({ _id: new Objectid(req.params.id) });
  let userName=user.name,userEmail=user.email,userNumber=user.number
  res.render("dashboard", {
    styledashboard: true,
    userEmail,
    userName,
    userNumber
  });
});

module.exports = router;
