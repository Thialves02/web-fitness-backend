const express = require("express");
const userController = require("../controllers/User");
const refeicoesController = require("../controllers/Refeicoes");
const refeicoesPersonalizadasController = require("../controllers/RefeicoesPersonalizadas");
const protect = require("../middleware/auth")

const router = express.Router();

//Rotas de usuário
router.route("/usuario/:id").get(userController.getUser);
router.route("/cadastrar").post(userController.create);
router.route("/login").post(userController.login);
router.route("/atualizar/:id").put(/* protect, */userController.update);

//Rotas de refeições padrão
router.route("/refeicoes").get(refeicoesController.getRefeicoes);
router.route("/criarRefeicao").post(refeicoesController.criarRefeicao);
router.route("/deletaRefeicao/:id").delete(refeicoesController.deletaRefeicao);

//Rotas de refeições personalizadas
router.route("/:id/refeicoesPersonalizadas").get(refeicoesPersonalizadasController.getRefeicoesPernsonalizadas);
router.route("/:id/criarRefeicaoPersonalizada").post(refeicoesPersonalizadasController.criarRefeicaoPersonalizada);
router.route("/atualizaRefeicaoPersonalizada/:idRefeicao").put(refeicoesPersonalizadasController.atualizaRefeicaoPersonalizada);
router.route("/deletaRefeicaoPersonalizada/:idRefeicao").delete(refeicoesPersonalizadasController.deletaRefeicaoPersonalizada);

//Rotas de adiçao de alimentos
/* router.route("/:id/alimentos/:idRefeicao").get(refeicoesPersonalizadasController.getRefeicoesPernsonalizadas);
router.route("/:id/adicionaAlimento/:idRefeicao").post(refeicoesPersonalizadasController.criarRefeicaoPersonalizada);
router.route("/:id/atualizaAlimento/:idRefeicao").put(refeicoesPersonalizadasController.atualizaRefeicaoPersonalizada);
router.route("/:id/deletaAlimento/:idRefeicao").delete(refeicoesPersonalizadasController.deletaRefeicaoPersonalizada); */

module.exports = router;
