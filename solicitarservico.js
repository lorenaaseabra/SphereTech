document.addEventListener("DOMContentLoaded", function () {
  carregarDadosCliente();
  atualizarDetalhesServico();
});

function carregarDadosCliente() {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  const emailLogado = localStorage.getItem("emailLogado");

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

function atualizarDetalhesServico() {
  const servico = document.getElementById("servico").value;
  let preco, prazo, descricao;

  switch (servico) {
    case "desenvolvimento":
      preco = "R$ 5000,00";
      prazo = 30;
      descricao =
        "Nosso serviço de Desenvolvimento de Software oferece soluções personalizadas e inovadoras para atender às necessidades exclusivas do seu negócio. " +
        "Nossa equipe de desenvolvedores altamente qualificados trabalha em colaboração com você para entender os desafios específicos da sua empresa, " +
        "criando software robusto e escalável, com foco em desempenho e experiência do usuário. Este serviço abrange desde a consultoria inicial até " +
        "a implementação e manutenção contínua, assegurando que o software acompanhe o crescimento e a evolução do seu negócio.";
      break;
    case "consultoria":
      preco = "R$ 1500,00";
      prazo = 15;
      descricao =
        "Nossa Consultoria em TI visa otimizar a infraestrutura de tecnologia da sua empresa, focando em eficiência, segurança e redução de custos operacionais. " +
        "Com uma análise detalhada do seu ambiente de TI, identificamos áreas de melhoria e implementamos práticas e soluções que maximizam a produtividade " +
        "e minimizam riscos. Trabalhamos lado a lado com sua equipe para garantir que a tecnologia suporte os objetivos estratégicos do seu negócio.";
      break;
    case "suporte":
      preco = "R$ 800,00";
      prazo = 7;
      descricao =
        "Nosso Suporte Técnico Especializado garante a estabilidade e o funcionamento contínuo do seu sistema de TI, minimizando interrupções e maximizando a eficiência operacional. " +
        "Oferecemos monitoramento proativo e assistência 24/7, além de diagnósticos rápidos e resoluções de problemas críticos. Esse serviço é ideal para empresas " +
        "que precisam de suporte técnico confiável para assegurar a continuidade dos negócios sem riscos de paradas inesperadas.";
      break;
    case "seguranca":
      preco = "R$ 3000,00";
      prazo = 20;
      descricao =
        "Nossos Serviços de Segurança da Informação foram projetados para proteger os dados e sistemas da sua empresa contra ameaças cibernéticas. " +
        "Aplicamos as melhores práticas de segurança, incluindo análise de vulnerabilidades, implementação de firewalls, criptografia de dados e monitoramento " +
        "contínuo, garantindo que seu ambiente de TI esteja sempre protegido. Além disso, fornecemos treinamentos para sua equipe, criando uma cultura de segurança " +
        "e reduzindo os riscos de ataques internos e externos.";
      break;
  }

  document.getElementById("precoServico").textContent = preco;
  document.getElementById("prazoServico").textContent = `${prazo} dias`;
  const dataPrevista = new Date();
  dataPrevista.setDate(dataPrevista.getDate() + prazo);
  document.getElementById("dataPrevistaServico").textContent =
    dataPrevista.toLocaleDateString("pt-BR");

  document.getElementById("solicitarServicoForm").dataset.descricaoServico =
    descricao;
}

function adicionarSolicitacao() {
  const tabelaSolicitacoes = document.getElementById("tabelaSolicitacoes");
  const servicoSelecionado =
    document.getElementById("servico").selectedOptions[0].text;
  const preco = document.getElementById("precoServico").textContent;
  const prazo = document.getElementById("prazoServico").textContent;
  const descricao = document.getElementById("solicitarServicoForm").dataset
    .descricaoServico;
  const dataPrevista = document.getElementById(
    "dataPrevistaServico"
  ).textContent;
  const dataPedido = new Date().toLocaleDateString("pt-BR");
  const numeroSolicitacao = Math.floor(Math.random() * 100000);
  const emptyStateRow = document.getElementById("emptyStateRow");
  emptyStateRow.style.display = "none";

  const linha = document.createElement("tr");
  linha.innerHTML = `
      <td>${dataPedido}</td>
      <td>${numeroSolicitacao}</td>
      <td>${servicoSelecionado}</td>
      <td>Em Elaboração</td>
      <td>${preco}</td>
      <td>${dataPrevista}</td>
      <td><div class="descricao-servico">${descricao}</div></td>
      <td><button class="btn btn-danger btn-sm" onclick="removerSolicitacao(this)">Excluir</button></td>
  `;
  tabelaSolicitacoes.appendChild(linha);

  document.getElementById("tabelaSolicitacoesWrapper").style.display = "table";
  document.getElementById("tituloTabela").style.display = "block";
}

function removerSolicitacao(botao) {
  const linha = botao.closest("tr");
  linha.remove();

  if (document.getElementById("tabelaSolicitacoes").rows.length === 0) {
    document.getElementById("tabelaSolicitacoesWrapper").style.display = "none";
    document.getElementById("tituloTabela").style.display = "none";
  }
}
