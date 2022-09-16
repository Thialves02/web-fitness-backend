const mongoose = require("mongoose");

const infoPessoalSchema = mongoose.Schema(
  {
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
    },
    idUsuario: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

const InfoPessoal = mongoose.model("InfoPessoal", infoPessoalSchema);
module.exports = InfoPessoal;
