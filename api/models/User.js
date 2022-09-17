const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: "Email address is required",
      match: /.+\@.+\..+/
    },
    senha: {
      type: String,
      required: true,
    },
    genero: {
      type: String,
      required: true,
    },
    peso: {
        type: String,
        required: true,
    },
    altura: {
      type: String,
      required: true,
    },
    idade: {
        type: String,
        required: true,
    },
    nivelAtividade: {
        type: String,
        required: true,
    },
    objetivo: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log(this)
  return await bcrypt.compare(enteredPassword, this.senha);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
