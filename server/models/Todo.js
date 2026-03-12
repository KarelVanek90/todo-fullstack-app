const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");
const data = new Mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    completed: {
      type: Boolean,
      default: false,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

data.index({ userId: 1, createdAt: -1 });

module.exports = Mongoose.model("todos-list", data);
