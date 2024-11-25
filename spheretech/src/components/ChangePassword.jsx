import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../App.css";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    senhaAtual: "",
    novaSenha: "",
    confirmaNovaSenha: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const trocarSenha = () => {
    const { email, senhaAtual, novaSenha, confirmaNovaSenha } = formData;

    if (novaSenha !== confirmaNovaSenha) {
      setMessage("As novas senhas não coincidem.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const indiceUsuario = usuarios.findIndex(
      (usuario) => usuario.email === email && usuario.senha === senhaAtual
    );

    if (indiceUsuario !== -1) {
      usuarios[indiceUsuario].senha = novaSenha;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert("Senha alterada com sucesso! Redirecionando para a página de login.");
      navigate("/login");
    } else {
      setMessage("E-mail ou senha atual incorretos.");
    }
  };

  const limparFormulario = () => {
    setFormData({
      email: "",
      senhaAtual: "",
      novaSenha: "",
      confirmaNovaSenha: "",
    });
    setMessage("");
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar loggedIn={false} />
      <div className="container mt-5 flex-grow-1">
        <h2 className="text-center">Troca de Senha de Clientes</h2>
        <div className="text-center mb-4">
          <img src="/assets/logo.png" alt="Logo da Empresa" />
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              E-mail:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="senhaAtual" className="form-label">
              Senha Atual:
            </label>
            <input
              type="password"
              className="form-control"
              id="senhaAtual"
              name="senhaAtual"
              placeholder="Digite sua senha atual"
              value={formData.senhaAtual}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="novaSenha" className="form-label">
              Nova Senha:
            </label>
            <input
              type="password"
              className="form-control"
              id="novaSenha"
              name="novaSenha"
              placeholder="Digite sua nova senha"
              value={formData.novaSenha}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmaNovaSenha" className="form-label">
              Confirme a Nova Senha:
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmaNovaSenha"
              name="confirmaNovaSenha"
              placeholder="Confirme sua nova senha"
              value={formData.confirmaNovaSenha}
              onChange={handleInputChange}
              required
            />
          </div>
          {message && <div className="text-danger mb-3">{message}</div>}
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-primary"
              onClick={trocarSenha}
            >
              Trocar Senha
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={limparFormulario}
            >
              Limpar
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ChangePassword;
