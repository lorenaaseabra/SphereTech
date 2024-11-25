import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RequestService = () => {
  const [services, setServices] = useState([]);
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  // Função para buscar os serviços disponíveis
  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/servicos/all");
      const data = await response.json();
      setServices(data.data);
    } catch (error) {
      setMessage("Erro ao carregar serviços.");
    }
  };

  // Função para buscar as solicitações de serviços do usuário
  const fetchUserRequests = async () => {
    try {
      const email = localStorage.getItem("emailLogado");
      const response = await fetch("http://localhost:5000/api/solicitacoes/get-user-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setRequests(data.data);
    } catch (error) {
      setMessage("Erro ao carregar solicitações.");
    }
  };

  // Função para atualizar as solicitações do usuário
  const handleUpdateRequests = async () => {
    try {
      const email = localStorage.getItem("emailLogado");
      const response = await fetch("http://localhost:5000/api/solicitacoes/update-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          solicitacoes: requests,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage("Solicitações atualizadas com sucesso!");
      }
    } catch (error) {
      setMessage("Erro ao atualizar solicitações.");
    }
  };

  // Carregar os serviços e solicitações ao montar o componente
  useEffect(() => {
    fetchServices();
    fetchUserRequests();
  }, []);

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar loggedIn={true} />
      <div className="container mt-5 flex-grow-1">
        <h2 className="text-center">Solicitação de Serviços</h2>
        <div className="my-3">
          <h5>Serviços Disponíveis</h5>
          {services.map((service) => (
            <div key={service._id}>
              <h6>{service.nome}</h6>
              <p>{service.descricao}</p>
              <p>Preço: {service.preco}</p>
              <p>Prazo: {service.prazo}</p>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={handleUpdateRequests}>
          Atualizar Solicitações
        </button>
        {message && <div className="text-danger mt-3">{message}</div>}
      </div>
      <Footer />
    </div>
  );
};

export default RequestService;
