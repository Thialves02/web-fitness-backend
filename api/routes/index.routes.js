const express = require("express");
const userController = require("../controllers/User");
const infoPessoalController = require("../controllers/InfoPessoal");
const protect = require("../middleware/auth")

const router = express.Router();

//Rotas de usuário
router.route("/cadastrar").post(userController.create);
router.route("/login").post(userController.login);
router.route("/users/:id").put(protect,userController.update);

//Rotas de informação pessoal
router.route("/infoPessoal/:id").get(infoPessoalController.get);
router.route("/infoPessoal/atualizar/:id").put(infoPessoalController.update);
router.route("/infoPessoal/criar").post(infoPessoalController.create);


module.exports = router;
