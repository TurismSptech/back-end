var database = require("../database/config");

function registrarContato(nome, empresa, email, assunto, mensagem) {
    var query = `INSERT INTO contato (nome_representante, nome_empresa, email, assunto, descricao, dt_envio) VALUES
    ('${nome}', '${empresa}', '${email}', '${assunto}', '${mensagem}', NOW());`;
    console.log("Executando a instrução SQL: \n" + query);
        return database.executar(query);
}

module.exports = {
    registrarContato,
};