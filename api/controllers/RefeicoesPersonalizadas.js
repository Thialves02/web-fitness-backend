const RefeicoesPersonalizadas = require("../models/RefeicoesPersonalizadas");

module.exports = {
  async getRefeicoesPernsonalizadas(req, res){
    const idUsuario = req.params.id
    console.log(idUsuario)
    try {
        const refeicoesPersonalizadas = await RefeicoesPersonalizadas.find({idUsuario});
        res.status(201).json(refeicoesPersonalizadas);
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    } 
  },
  
  async criarRefeicaoPersonalizada(req, res) {
    const { nome, horario  } = req.body;
    const idUsuario = req.params.id

    const horarioIgual = await RefeicoesPersonalizadas.find({ horario });
    const usuarioIgual = horarioIgual[0].idUsuario == idUsuario

    console.log(horarioIgual[0].idUsuario)
    console.log(idUsuario)
    console.log(horarioIgual)
    console.log(usuarioIgual)
    if(usuarioIgual) {
      res.status(400).json("Já existe uma refeição cadastrada nesse horário!!");
      return
    }

    
    try {
      const refeicaoPersonalizada = await RefeicoesPersonalizadas.create({
        nome,
        horario,
        idUsuario
      });

      res.status(201).json(refeicaoPersonalizada);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  async atualizaRefeicaoPersonalizada(req, res) {
    const idRef = req.params.idRefeicao
    const refeicao = await RefeicoesPersonalizadas.findById(idRef);

    if (!refeicao) {
      res.status(400).json("Refeição não existe!!");
      return
    }

    refeicao.nome = req.body.nome || refeicao.nome;
    refeicao.horario = req.body.horario || refeicao.horario;
    
    try {
      const updateRef = await refeicao.save();
      res.status(201).json(updateRef);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  async deletaRefeicaoPersonalizada(req, res) {
    const idRef = req.params.idRefeicao
    const refeicao = await RefeicoesPersonalizadas.findById(idRef);

    if (!refeicao) {
      res.status(400).json("Refeição não existe!!");
      return
    }

    try {
      console.log(await refeicao.deleteOne())
      const deleteRef = await refeicao.deleteOne();
      console.log(deleteRef)
      res.status(201).json(deleteRef);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
