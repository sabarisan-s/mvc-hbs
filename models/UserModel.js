const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/clientusers")
  .then(() => {
    console.log("conected");
  })
  .catch((e) => {
    console.log(e.message, "not connected");
  });

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "min character is 3"],
    maxLength: [25, "max character is 25"],
    required: [true, "name is required"],
    trim: true,
  },
  number: {
    type: Number,
    required: [true, "number required"],
    unique: [true, `number already used`],
    length: [10, "length is 10"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email required"],
    unique: [true, "email already used ${value}"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password required"],
    trim: true,
  },
});
module.exports = mongoose.model("user", UserSchema);
