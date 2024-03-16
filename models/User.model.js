const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    username: String,
    city: String,
    picture: String,
    profileDescription: String,
    role: {
      type: String,
      enum: ["Client", "Architect", "Designer", "Handyman"],
      required: true
    },
    isaprofessional: {
      type: Boolean,
      default: function() {
        return this.role === 'Architect' || this.role === 'Designer' || this.role === 'Handyman';
      },
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;