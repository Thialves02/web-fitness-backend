const InfoPessoal = require("../models/InfoPessoal");

module.exports = {
    async get(req, res) {
        const  idUsuario  = req.params.id;

        try {
            const infoPessoal = await InfoPessoal.find({idUsuario});
            res.status(201).json(infoPessoal);
        } catch (error) {
            res.status(400).json(error);
        } 
    },

  async create(req, res) {
    const { genero, altura, idade, nivelAtividade, objetivo , peso, idUsuario } = req.body;

    try {
        const infoPessoal = await InfoPessoal.create({
            genero,
            altura, 
            idade, 
            nivelAtividade, 
            objetivo, 
            peso,
            idUsuario
        });
        res.status(201).json(infoPessoal);
    } catch (error) {
        res.status(400).json(error);
    } 
  },
  
  async update(req, res) {
    const idUsuario = req.params.id
    const infoPessoal = await InfoPessoal.find({idUsuario});

    if (!infoPessoal) {
      res.status(400).json("Usuário não existe!!");
    } else {
        infoPessoal.genero = req.body.genero || infoPessoal[0].genero;
        infoPessoal[0].peso = req.body.peso || infoPessoal[0].peso;
        infoPessoal[0].altura = req.body.altura || infoPessoal[0].altura;
        infoPessoal[0].idade = req.body.idade || infoPessoal[0].idade;
        infoPessoal[0].nivelAtividade = req.body.nivelAtividade || infoPessoal[0].nivelAtividade;
        infoPessoal[0].objetivo = req.body.objetivo || infoPessoal[0].objetivo;
        infoPessoal[0].idUsuario = infoPessoal[0].idUsuario
        try {
          const updateInfoPessoal = await infoPessoal[0].save();
          res.status(201).json(updateInfoPessoal);
        } catch (error) {
          res.status(400).json(error);
        }
    } 
  },
};
