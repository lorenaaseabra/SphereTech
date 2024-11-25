import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../App.css";

const RequestService = () => {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({ nome: "", email: "" });
  const [servicoSelecionado, setServicoSelecionado] = useState("desenvolvimento");
  const [detalhesServico, setDetalhesServico] = useState({
    preco: "R$ 5000,00",
    prazo: "30 dias",
    descricao: "",
    dataPrevista: "",
  });
  const [solicitacoes, setSolicitacoes] = useState([]);

  useEffect(() => {
    carregarDadosCliente();
    atualizarDetalhesServico("desenvolvimento");
  }, []);

  const carregarDadosCliente = () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const emailLogado = localStorage.getItem("emailLogado");

    const usuarioLogado = usuarios.find((usuario) => usuario.email === emailLogado);

    if (usuarioLogado) {
      setCliente({ nome: usuarioLogado.nome, email: usuarioLogado.email });
    } else {
      alert("Nenhum usuário logado. Redirecionando para a página de login.");
      navigate("/login");
    }
  };

  const atualizarDetalhesServico = (servico) => {
    let preco, prazo, descricao;
    const hoje = new Date();
    switch (servico) {
      case "desenvolvimento":
        preco = "R$ 5000,00";
        prazo = "30 dias";
        descricao =
          "Soluções personalizadas de desenvolvimento de software para atender às necessidades do seu negócio.";
        hoje.setDate(hoje.getDate() + 30);
        break;
      case "consultoria":
        preco = "R$ 1500,00";
        prazo = "15 dias";
        descricao =
          "Consultoria estratégica em TI para otimizar sua infraestrutura tecnológica.";
        hoje.setDate(hoje.getDate() + 15);
        break;
      case "suporte":
        preco = "R$ 800,00";
        prazo = "7 dias";
        descricao =
          "Suporte técnico especializado para manter seus sistemas funcionando sem interrupções.";
        hoje.setDate(hoje.getDate() + 7);
        break;
      case "seguranca":
        preco = "R$ 3000,00";
        prazo = "20 dias";
        descricao =
          "Serviços de segurança da informação para proteger seus dados e sistemas contra ameaças cibernéticas.";
        hoje.setDate(hoje.getDate() + 20);
        break;
      default:
        break;
    }
    setDetalhesServico({
      preco,
      prazo,
      descricao,
      dataPrevista: hoje.toLocaleDateString("pt-BR"),
    });
  };

  const adicionarSolicitacao = () => {
    const numeroSolicitacao = Math.floor(Math.random() * 100000);
    const novaSolicitacao = {
      dataPedido: new Date().toLocaleDateString("pt-BR"),
      numeroSolicitacao,
      servico: servicoSelecionado,
      status: "Em Elaboração",
      preco: detalhesServico.preco,
      dataPrevista: detalhesServico.dataPrevista,
      descricao: detalhesServico.descricao,
    };

    setSolicitacoes((prev) => [...prev, novaSolicitacao]);
  };

  const removerSolicitacao = (numeroSolicitacao) => {
    setSolicitacoes((prev) =>
      prev.filter((solicitacao) => solicitacao.numeroSolicitacao !== numeroSolicitacao)
    );
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar loggedIn={true} />
      <div className="container mt-5 flex-grow-1">
        <h2 className="text-center">Solicitação de Serviços</h2>

        <div className="my-4">
          <h5>Dados do Cliente:</h5>
          <p>
            <strong>Nome:</strong> {cliente.nome}
          </p>
          <p>
            <strong>E-mail:</strong> {cliente.email}
          </p>
        </div>

        <form>
          <div className="mb-3">
            <label htmlFor="servico" className="form-label">
              Serviço de TI:
            </label>
            <select
              id="servico"
              className="form-select"
              value={servicoSelecionado}
              onChange={(e) => {
                setServicoSelecionado(e.target.value);
                atualizarDetalhesServico(e.target.value);
              }}
            >
              <option value="desenvolvimento">Desenvolvimento de Software</option>
              <option value="consultoria">Consultoria em TI</option>
              <option value="suporte">Suporte Técnico</option>
              <option value="seguranca">Segurança da Informação</option>
            </select>
          </div>
          <div className="mb-3">
            <h5>Detalhes do Serviço:</h5>
            <p>
              <strong>Preço:</strong> {detalhesServico.preco}
            </p>
            <p>
              <strong>Prazo:</strong> {detalhesServico.prazo}
            </p>
            <p>
              <strong>Data Prevista de Atendimento:</strong>{" "}
              {detalhesServico.dataPrevista}
            </p>
            <p>
              <strong>Descrição:</strong> {detalhesServico.descricao}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={adicionarSolicitacao}
          >
            Solicitar Serviço
          </button>
        </form>

        <h3 className="my-4">Minhas Solicitações</h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Data do Pedido</th>
              <th>Número da Solicitação</th>
              <th>Serviço</th>
              <th>Status</th>
              <th>Preço</th>
              <th>Data Prevista</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {solicitacoes.length > 0 ? (
              solicitacoes.map((solicitacao) => (
                <tr key={solicitacao.numeroSolicitacao}>
                  <td>{solicitacao.dataPedido}</td>
                  <td>{solicitacao.numeroSolicitacao}</td>
                  <td>{solicitacao.servico}</td>
                  <td>{solicitacao.status}</td>
                  <td>{solicitacao.preco}</td>
                  <td>{solicitacao.dataPrevista}</td>
                  <td>{solicitacao.descricao}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        removerSolicitacao(solicitacao.numeroSolicitacao)
                      }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  Nenhuma solicitação encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default RequestService;
