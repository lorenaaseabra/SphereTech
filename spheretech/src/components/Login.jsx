import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../App.css"; // Certifique-se de que o estilo global está incluído

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validarLogin = () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar se o e-mail e a senha correspondem a um usuário cadastrado
    const usuarioValido = usuarios.find(
      (usuario) => usuario.email === email && usuario.senha === senha
    );

    if (usuarioValido) {
      localStorage.setItem("emailLogado", email); // Armazenar o e-mail do usuário logado
      alert(
        "Login realizado com sucesso! Redirecionando para a página de solicitação de serviços."
      );
      navigate("/request-service");
    } else {
      setMessage("E-mail ou senha incorretos.");
    }
  };

  const limparFormulario = () => {
    setEmail("");
    setSenha("");
    setMessage("");
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar loggedIn={false} />
      <div className="container mt-5 flex-grow-1">
        <h2 className="text-center">Login de Clientes</h2>
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
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label">
              Senha:
            </label>
            <input
              type="password"
              className="form-control"
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          {message && <div className="text-danger mb-3">{message}</div>}
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-primary"
              onClick={validarLogin}
            >
              Realizar Login
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={limparFormulario}
            >
              Limpar
            </button>
          </div>
          <div className="mt-3">
            <a href="/change-password">Trocar minha senha</a>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
