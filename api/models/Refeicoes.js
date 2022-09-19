const mongoose = require("mongoose");

const refeicoesSchema = mongoose.Schema(
  {
    nome: {
        type: String,
        required: true,
    },
    horario:{
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Refeicoes = mongoose.model("Refeicoes", refeicoesSchema);
module.exports = Refeicoes;
