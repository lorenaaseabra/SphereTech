import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../App.css";

const CreateService = () => {
  const [serviceData, setServiceData] = useState({
    nome: "",
    preco: "",
    descricao: "",
    prazo: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handleCreateService = async () => {
    try {
      const response = await fetch("/api/servicos/create", {
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

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar loggedIn={true} />
      <div className="container mt-5 flex-grow-1">
        <h2 className="text-center">Cadastrar Novo Serviço</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome do Serviço:</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              name="nome"
              value={serviceData.nome}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="preco" className="form-label">Preço:</label>
            <input
              type="number"
              className="form-control"
              id="preco"
              name="preco"
              value={serviceData.preco}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descricao" className="form-label">Descrição:</label>
            <textarea
              className="form-control"
              id="descricao"
              name="descricao"
              value={serviceData.descricao}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="prazo" className="form-label">Prazo:</label>
            <input
              type="text"
              className="form-control"
              id="prazo"
              name="prazo"
              value={serviceData.prazo}
              onChange={handleInputChange}
              required
            />
          </div>
          {message && <div className="text-success mb-3">{message}</div>}
          <button type="button" className="btn btn-primary" onClick={handleCreateService}>
            Cadastrar Serviço
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateService;
