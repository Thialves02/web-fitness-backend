const express = require("express");
const userController = require("../controllers/User");
const protect = require("../middleware/auth")

const router = express.Router();

//Rotas de usuário
router.route("/usuario/:id").get(userController.getUser);
router.route("/cadastrar").post(userController.create);
router.route("/login").post(userController.login);
router.route("/atualizar/:id").put(protect,userController.update);

module.exports = router;
