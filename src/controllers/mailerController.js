var nodemailer = require("nodemailer");
var mailerModel = require("../models/mailerModel");

async function enviar(req, res) {
    var nome = req.body.nomeServer;
    var empresa = req.body.empresaServer;
    var email = req.body.emailServer;
    var assunto = req.body.assuntoServer;
    var mensagem = req.body.mensagemServer;
    var usuario = process.env.MAILER_USER;
    var senha = process.env.MAILER_PASS;

    if (!usuario || !senha) {
        return res.status(500).json({ erro: "Serviço de e-mail não configurado." });
    }

    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: usuario,
            pass: senha
        }
    });

    try {
        await transporter.sendMail({
            from: usuario,
            to: usuario,
            replyTo: email,
            subject: assunto,
            text: `Nome: ${nome}\nEmpresa: ${empresa}\nE-mail: ${email}\nMensagem: ${mensagem}`
        });

        mailerModel.registrarContato(nome, empresa, email, assunto, mensagem)
            .then( (resultado) => 
                { 
                    res.json(resultado) 

                }).catch( 
                    (erro) => {
                        console.log(erro);
                        console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                });

        return res.status(200).json({ mensagem: "E-mail enviado com sucesso." });
    } catch (erro) {
        console.error("Houve um erro ao enviar o e-mail:", erro);
        return res.status(500).json({ erro: "Não foi possível enviar o e-mail." });
    }
}

module.exports = {
    enviar
};