const Refeicoes = require("../models/Refeicoes");

module.exports = {
  async getRefeicoes(req, res){
    try {
        const refeicoes = await Refeicoes.find();
        res.status(201).json(refeicoes);
    } catch (error) {
        res.status(400).json(error);
    } 
  },
  
  async criarRefeicao(req, res) {
    const { nome, horario } = req.body;
    const horarioIgual = await Refeicoes.findOne({ horario });

    if(horarioIgual) {
      res.status(400).json("Já existe uma refeição cadastrada nesse horário!!");
      return
    }
    try {
      const refeicao = await Refeicoes.create({
        nome,
        horario,
      });

      res.status(201).json(refeicao);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  async deletaRefeicao(req, res) {
    const idRef = req.params.id
    const refeicao = await Refeicoes.findById(idRef);
console.log()
    if (!refeicao) {
      res.status(400).json("Refeição não existe!!");
      return
    }

    try {
      const deleteRef = await refeicao.deleteOne();
      res.status(201).json(deleteRef);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
