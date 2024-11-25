import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/clientes/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        navigate("/request-service");
      } else {
        setMessage("Credenciais inválidas.");
      }
    } catch (error) {
      setMessage("Erro ao autenticar.");
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar loggedIn={false} />
      <div className="container mt-5 flex-grow-1">
        <h2 className="text-center">Login de Clientes</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="senha" className="form-label">Senha:</label>
            <input
              type="password"
              className="form-control"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          {message && <div className="text-danger mb-3">{message}</div>}
          <button type="button" className="btn btn-primary" onClick={handleLogin}>
            Realizar Login
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
