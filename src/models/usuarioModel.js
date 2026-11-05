var database = require("../database/config")

function autenticar(email, senha) {
    var instrucaoSql = `
        SELECT id_usuario AS id, email, fk_agencia AS agenciaId, t.tipo AS cargo
        FROM usuario u
        JOIN tipo_usuario t
        ON t.fk_usuario = u.id_usuario
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
        INSERT INTO usuario (email, senha, fk_agencia)
        VALUES (?, ?, ?);      
    `;
    return database.executar(instrucaoSql, [email, senha, fkAgencia]);
}

function cadTipos(idUsuario) {
    var instrucaoSql = `
        INSERT INTO tipo_usuario (tipo, fk_usuario)
        VALUES ('Agente', ?);
    `;
    return database.executar(instrucaoSql, [idUsuario]);
}

module.exports = {
    autenticar,
    cadastrar,
    listarAgencias,
    cadTipos
};