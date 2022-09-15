const User = require("../models/User");
const generateToken = require("../utils/generateToken");

module.exports = {
  async create(req, res) {
    const { nome, email, senha } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json("Usuário já existe!!");
    } else {
      try {
        const user = await User.create({
          nome,
          email,
          senha,
        });
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json(error);
      }
    }
    
  },
  async login(req, res) {
    const { email, senha } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json("Usuário não existe!!");
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
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(400).json("Usuário não existe!!");
    }
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    try {
      const updateUser = await user.save();
      res.status(201).json(updateUser);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
