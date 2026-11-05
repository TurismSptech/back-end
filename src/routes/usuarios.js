var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/agencias", function (req, res) {
    usuarioController.listarAgencias(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;