
function enviar() {
  const nome = ipt_nome.value;
  const empresa = ipt_empresa.value;
  const email = ipt_email.value;
  const assunto = ipt_assunto.value;
  const mensagem = ipt_mensagem.value;

  if(nome == ''){
    ipt_nome.style.border = "1px solid red";
    ipt_nome.focus();
  }

  if(empresa == ''){
    ipt_empresa.style.border = "1px solid red";
    ipt_empresa.focus();
  }

  if(email == ''){
    ipt_email.style.border = "1px solid red";
    ipt_email.focus();
  }

  if(mensagem == ''){
    ipt_mensagem.style.border = "1px solid red";
    ipt_mensagem.focus();
  }

  if (nome !== '' && empresa !== '' && email !== '' && mensagem !== ''){
        fetch('/mailer/enviar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nomeServer: nome,
            empresaServer: empresa,
            emailServer: email,
            assuntoServer: assunto,
            mensagemServer: mensagem
          }),
        
        }).then(async function (resposta){
          var resultado = await resposta.json();
    
            if (!resposta.ok) {
              throw new Error(resultado.erro || 'Não foi possível enviar o e-mail.');
            }else{
              console.log("Email enviado")
              setTimeout(() => {
                  window.location = "index.html#contato";
              }, "2000");
            }
    
            alert(resultado.mensagem);
        }).catch (function (erro) {
              console.error('Erro ao enviar o e-mail:', erro);
              alert(erro.message || 'Não foi possível enviar o e-mail.');
      });
  }else{
    alert("Preencha todos os campos!");
    setTimeout(() => {
          window.location = "index.html#contato";
    }, "2000");
  }

}

