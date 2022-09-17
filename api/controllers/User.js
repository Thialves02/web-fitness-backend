const User = require("../models/User");
const generateToken = require("../utils/generateToken");

module.exports = {
  async getUser(req, res){
    const  id = req.params.id;

    if(!id){
      res.status(400).json("Usuário não encontrado!!");
      return 
    }
    try {
        const user = await User.findById(id);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json(error);
    } 
  },

  async create(req, res) {
    const { nome, email, senha, genero, altura, idade, nivelAtividade, objetivo , peso } = req.body;
    const userExists = await User.findOne({ email });

    if(userExists) {
      res.status(400).json("Usuário já existe!!");
      return
    }
    try {
      const user = await User.create({
        nome,
        email,
        senha,
        genero,
        altura, 
        idade, 
        nivelAtividade, 
        objetivo, 
        peso
      });

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  async login(req, res) {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json("Usuário não existe!!");
      return 
    }
    if (await user.matchPassword(senha)) {
      res.status(200).json({
        _id: user._id,
        nome: user.nome,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json("E-mail ou senha inválidos");
    }
  },

  async update(req, res) {
    const  id = req.params.id;
    const user = await User.findById(id);

    if (!user) {
      res.status(400).json("Usuário não existe!!");
      return
    }

    user.peso = req.body.peso || user.peso;
    user.altura = req.body.altura || user.altura;
    user.idade = req.body.idade || user.idade;
    user.nivelAtividade = req.body.nivelAtividade || user.nivelAtividade;
    user.objetivo = req.body.objetivo || user.objetivo;
    
    try {
      const updateUser = await user.save();
      res.status(201).json(updateUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
