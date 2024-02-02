const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  senderId: {
    type: "string",
    required: true,
  },
  recieverId: {
    type: "string",
    required: true,
  },
  message: {
    type: "string",
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
