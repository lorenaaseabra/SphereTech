import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RequestService = () => {
  const [serviceData, setServiceData] = useState({
    nome: "",
    preco: "",
    descricao: "",
    prazo: "",
  });
  const [services, setServices] = useState([]);
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedService, setSelectedService] = useState({
    nome: "",
    preco: "R$ 0,00",
    prazo: "0 dias",
    descricao: "",
  });

  const [user, setUser] = useState({ nome: "", email: "" });

  useEffect(() => {
    fetchServices();
    fetchUserData();  // Chamada para buscar os dados do cliente logado
    fetchUserRequests();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/servicos/all");
      const data = await response.json();
      if (data.success) {
        setServices(data.data);
      } else {
        setMessage("Erro ao carregar os serviços.");
      }
    } catch (error) {
      setMessage("Erro ao carregar os serviços.");
    }
  };

  const fetchUserData = async () => {
    try {
      const email = localStorage.getItem("emailLogado");
      const response = await fetch("http://localhost:5000/api/clientes/get-user-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setUser(data.data); // Armazena o nome e o email do usuário
      } else {
        setMessage("Erro ao carregar dados do cliente.");
      }
    } catch (error) {
      setMessage("Erro ao carregar dados do cliente.");
    }
  };

  const fetchUserRequests = async () => {
    try {
      const email = localStorage.getItem("emailLogado");
      const response = await fetch("http://localhost:5000/api/solicitacoes/get-user-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success) {
        setRequests(data.data);
      } else {
        setMessage("Erro ao carregar solicitações.");
      }
    } catch (error) {
      setMessage("Erro ao carregar solicitações.");
    }
  };

  const handleUpdateRequests = async () => {
    try {
      const email = localStorage.getItem("emailLogado");
      const response = await fetch("http://localhost:5000/api/solicitacoes/update-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, solicitacoes: requests }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Solicitações atualizadas com sucesso!");
      } else {
        setMessage("Erro ao atualizar solicitações.");
      }
    } catch (error) {
      setMessage("Erro ao atualizar solicitações.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handleCreateService = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/servicos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Serviço cadastrado com sucesso!");
        setServiceData({ nome: "", preco: "", descricao: "", prazo: "" });
      } else {
        setMessage(data.message || "Erro ao cadastrar serviço.");
      }
    } catch (error) {
      setMessage("Erro ao cadastrar serviço.");
    }
  };

  const handleServiceSelection = (e) => {
    const selectedOption = e.target.value;
    const service = services.find((service) => service.nome === selectedOption);
    if (service) {
      setSelectedService({
        nome: service.nome,
        preco: service.preco,
        prazo: service.prazo,
        descricao: service.descricao,
      });
    }
  };

  // Função para remover uma solicitação
  const handleDeleteRequest = (numeroSolicitacao) => {
    // Filtra as solicitações removendo a solicitacao com o numero correspondente
    const updatedRequests = requests.filter(
      (request) => request.numeroSolicitacao !== numeroSolicitacao
    );
    setRequests(updatedRequests);
    setMessage("Solicitação removida com sucesso!");
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar loggedIn={true} />
      <div className="container mt-5 flex-grow-1">
        <h2 className="text-center">Solicitação de Serviços</h2>

        {/* Dados do Cliente */}
        <div id="dadosCliente" className="my-4">
          <h5>Dados do Cliente:</h5>
          <p><strong>Nome:</strong> <span id="nomeCliente">{user.nome}</span></p>
          <p><strong>E-mail:</strong> <span id="emailCliente">{user.email}</span></p>
        </div>

        {/* Formulário de Solicitação de Serviço */}
        <form id="solicitarServicoForm">
          <div className="mb-3">
            <label htmlFor="servico" className="form-label">Serviço de TI:</label>
            <select id="servico" className="form-select" onChange={handleServiceSelection} name="servico">
              {services.map((service, index) => (
                <option key={index} value={service.nome}>{service.nome}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label"><strong>Detalhes do Serviço:</strong></label>
            <p><strong>Preço:</strong> <span id="precoServico">{selectedService.preco}</span></p>
            <p><strong>Prazo de Atendimento:</strong> <span id="prazoServico">{selectedService.prazo}</span></p>
            <p><strong>Data Prevista de Atendimento:</strong> 
              <span id="dataPrevistaServico">
                {new Date().toLocaleDateString("pt-BR")}
              </span>
            </p>
            <p><strong>Descrição:</strong> <span id="descricaoServico">{selectedService.descricao}</span></p>
          </div>

          <button type="button" className="btn btn-primary" onClick={handleCreateService}>
            Solicitar Serviço
          </button>
        </form>

        {/* Tabela de Solicitações */}
        <h3 className="my-4" id="tituloTabela">Minhas Solicitações</h3>
        <table className="table table-bordered overflow-y-scroll" id="tabelaSolicitacoesWrapper">
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
          <tbody id="tabelaSolicitacoes">
            {requests.length === 0 && (
              <tr id="emptyStateRow">
                <td colSpan="8" className="text-center text-muted py-4">
                  <i className="fas fa-folder-open fa-2x mb-2"></i>
                  <p className="mb-0">Nenhuma solicitação encontrada</p>
                  <small>Adicione novas solicitações para vê-las aqui.</small>
                </td>
              </tr>
            )}
            {requests.map((request, index) => (
              <tr key={index}>
                <td>{request.dataPedido}</td>
                <td>{request.numeroSolicitacao}</td>
                <td>{request.servico}</td>
                <td>{request.status}</td>
                <td>{request.preco}</td>
                <td>{request.dataPrevista}</td>
                <td><div className="descricao-servico">{request.descricao}</div></td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRequest(request.numeroSolicitacao)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {message && <div className="text-danger mt-3">{message}</div>}
      </div>
      <Footer />
    </div>
  );
};

export default RequestService;
