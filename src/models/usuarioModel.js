var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT cod_usuario AS id, email, cargo, fk_agencia AS agenciaId
        FROM usuario
        WHERE email = ? AND senha = ?;
    `;
    return database.executar(instrucaoSql, [email, senha]);
}

function listarAgencias() {
    var instrucaoSql = `
        SELECT id_agencia AS id, nome
        FROM agencia
        ORDER BY nome;
    `;
    return database.executar(instrucaoSql);
}

function cadastrar(email, senha, fkAgencia) {
    var instrucaoSql = `
        INSERT INTO usuario (email, senha, cargo, fk_agencia)
        VALUES (?, ?, 'Agente', ?);
    `;
    return database.executar(instrucaoSql, [email, senha, fkAgencia]);
}

module.exports = {
    autenticar,
    cadastrar,
    listarAgencias
};