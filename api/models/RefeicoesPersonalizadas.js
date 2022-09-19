const mongoose = require("mongoose");

const refeicoesPersonalizadasSchema = mongoose.Schema(
  {
    nome: {
        type: String,
        required: true,
    },
    horario:{
        type: String,
        required: true,
    },
    idUsuario:{
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RefeicoesPersonalizadas = mongoose.model("RefeicoesPersonalizadas", refeicoesPersonalizadasSchema);
module.exports = RefeicoesPersonalizadas;
