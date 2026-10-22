var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer || req.body.email;
    var senha = req.body.senhaServer || req.body.senha;

    if (typeof email !== "string" || !email.trim()) {
        res.status(400).send("Seu email está undefined!");
    } else if (typeof senha !== "string" || !senha) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        email = email.trim();
        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                if (resultadoAutenticar.length === 1) {
                    res.json(resultadoAutenticar[0]);
                } else if (resultadoAutenticar.length === 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(500).send("Mais de um usuário encontrado para este email.");
                }
            })
            .catch(function (erro) {
                console.error("\nHouve um erro ao realizar o login: ", erro.sqlMessage || erro);
                res.status(500).send("Houve um erro ao realizar o login.");
            });
    }
}

function cadastrar(req, res) {
    var email = req.body.emailServer || req.body.email;
    var senha = req.body.senhaServer || req.body.senha;
    var fkAgencia = Number(req.body.idAgenciaServer || req.body.fkAgenciaServer || req.body.fk_agencia);

    if (typeof email !== "string" || !email.trim() || email.length > 45 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        res.status(400).send("Informe um email válido com até 45 caracteres.");
    } else if (typeof senha !== "string" || !senha || senha.length > 45) {
        res.status(400).send("Informe uma senha com até 45 caracteres.");
    } else if (!Number.isInteger(fkAgencia) || fkAgencia <= 0) {
        res.status(400).send("Selecione uma agência válida.");
    } else {
        email = email.trim();
        usuarioModel.cadastrar(email, senha, fkAgencia)
            .then(function (resultado) {
                res.status(201).json({
                    id: resultado.insertId,
                    email: email,
                    cargo: "Agente",
                    agenciaId: fkAgencia
                });
            })
            .catch(function (erro) {
                if (erro.code === "ER_DUP_ENTRY") {
                    res.status(409).send("Já existe um usuário cadastrado com este email.");
                    return;
                }

                console.error("\nHouve um erro ao realizar o cadastro: ", erro.sqlMessage || erro);
                res.status(500).send("Houve um erro ao realizar o cadastro.");
            });
    }
}

function listarAgencias(req, res) {
    usuarioModel.listarAgencias()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.error("\nHouve um erro ao listar as agências: ", erro.sqlMessage || erro);
            res.status(500).send("Houve um erro ao listar as agências.");
        });
}

module.exports = {
    autenticar,
    cadastrar,
    listarAgencias
}