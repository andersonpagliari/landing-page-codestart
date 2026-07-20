const botaoSaibaMais = document.getElementById("botaoSaibaMais");
const formulario = document.getElementById("formContato");
const mensagemRetorno = document.getElementById("mensagemRetorno");
const botaoBuscarCep = document.getElementById("buscarCep");

botaoSaibaMais.addEventListener("click", function () {
    alert("Obrigado pelo interesse no CodeStart!");
    document.getElementById("sobre").scrollIntoView({
        behavior: "smooth"
    });
});

botaoBuscarCep.addEventListener("click", function () {
    const cep = document.getElementById("cep").value.replace(/\D/g, "");

    if (cep.length !== 8) {
        alert("Digite um CEP válido com 8 números.");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(function (resposta) {
            return resposta.json();
        })
        .then(function (dados) {
            if (dados.erro) {
                alert("CEP não encontrado.");
                return;
            }

            document.getElementById("logradouro").value = dados.logradouro;
            document.getElementById("bairro").value = dados.bairro;
            document.getElementById("cidade").value = dados.localidade;
            document.getElementById("estado").value = dados.uf;
        })
        .catch(function () {
            alert("Não foi possível consultar o CEP.");
        });
});

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value;

    mensagemRetorno.textContent =
        "Obrigado, " + nome + "! Sua mensagem foi enviada com sucesso.";

    formulario.reset();
});
