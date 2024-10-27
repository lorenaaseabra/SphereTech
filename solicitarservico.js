document.addEventListener("DOMContentLoaded", function () {
  carregarDadosCliente();
  atualizarDetalhesServico();
});

// Função para carregar o nome e o e-mail do cliente logado
function carregarDadosCliente() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const emailLogado = localStorage.getItem("emailLogado");

  // Encontrar o usuário logado no array de usuários
  const usuarioLogado = usuarios.find(
    (usuario) => usuario.email === emailLogado
  );

  if (usuarioLogado) {
    document.getElementById("nomeCliente").textContent = usuarioLogado.nome;
    document.getElementById("emailCliente").textContent = usuarioLogado.email;
  } else {
    alert("Nenhum usuário logado. Redirecionando para a página de login.");
    window.location.href = "login.html";
  }
}

// Atualizar os detalhes do serviço com base na seleção
function atualizarDetalhesServico() {
  const servico = document.getElementById("servico").value;
  let preco, prazo;

  switch (servico) {
    case "desenvolvimento":
      preco = "R$ 5000,00";
      prazo = 30;
      break;
    case "consultoria":
      preco = "R$ 1500,00";
      prazo = 15;
      break;
    case "suporte":
      preco = "R$ 800,00";
      prazo = 7;
      break;
    case "seguranca":
      preco = "R$ 3000,00";
      prazo = 20;
      break;
  }

  document.getElementById("precoServico").textContent = preco;
  document.getElementById("prazoServico").textContent = `${prazo} dias`;
  const dataPrevista = new Date();
  dataPrevista.setDate(dataPrevista.getDate() + prazo);
  document.getElementById("dataPrevistaServico").textContent =
    dataPrevista.toLocaleDateString("pt-BR");
}

// Adicionar solicitação de serviço à tabela
function adicionarSolicitacao() {
  const tabelaSolicitacoes = document.getElementById("tabelaSolicitacoes");
  const servicoSelecionado =
    document.getElementById("servico").selectedOptions[0].text;
  const preco = document.getElementById("precoServico").textContent;
  const dataPrevista = document.getElementById(
    "dataPrevistaServico"
  ).textContent;
  const dataPedido = new Date().toLocaleDateString("pt-BR");
  const numeroSolicitacao = Math.floor(Math.random() * 100000);

  // Adicionar linha à tabela
  const linha = document.createElement("tr");
  linha.innerHTML = `
        <td>${dataPedido}</td>
        <td>${numeroSolicitacao}</td>
        <td>${servicoSelecionado}</td>
        <td>Em Elaboração</td>
        <td>${preco}</td>
        <td>${dataPrevista}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removerSolicitacao(this)">Excluir</button></td>
    `;
  tabelaSolicitacoes.appendChild(linha);
}

// Remover solicitação de serviço da tabela
function removerSolicitacao(botao) {
  const linha = botao.closest("tr");
  linha.remove();
}
