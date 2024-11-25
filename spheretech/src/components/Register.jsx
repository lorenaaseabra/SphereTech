import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../App.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    confirmaSenha: "",
    nome: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    estadoCivil: "solteiro",
    escolaridade: "2º grau completo",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validarCadastro = () => {
    const {
      email,
      senha,
      confirmaSenha,
      nome,
      cpf,
      dataNascimento,
      telefone,
    } = formData;

    // Validação do e-mail
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setMessage("Por favor, insira um e-mail válido.");
      return;
    }

    // Validação da senha
    const senhaPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!?\/\\|+_.=-]).{6,}$/;
    if (!senhaPattern.test(senha) || senha !== confirmaSenha) {
      setMessage(
        "A senha deve atender aos requisitos e coincidir com a confirmação."
      );
      return;
    }

    // Validação do nome
    const nomePattern = /^[A-Za-z]+(?: [A-Za-z]+)+$/;
    if (!nomePattern.test(nome) || nome.split(" ")[0].length < 2) {
      setMessage(
        "O nome deve ter pelo menos duas palavras e a primeira palavra deve ter pelo menos 2 caracteres."
      );
      return;
    }

    // Validação do CPF
    const cpfNumeros = cpf.replace(/[^\d]/g, "");
    if (cpfNumeros.length !== 11 || !validarCPF(cpfNumeros)) {
      setMessage("CPF inválido.");
      return;
    }

    // Validação da idade
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    if (
      idade < 18 ||
      (idade === 18 &&
        hoje < new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate()))
    ) {
      setMessage("O cliente deve ser maior de idade.");
      return;
    }

    // Validação do telefone
    const telefonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (telefone && !telefonePattern.test(telefone)) {
      setMessage("Telefone inválido. Utilize o formato (XX) XXXXX-XXXX.");
      return;
    }

    // Verificar duplicidade de e-mail
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuarios.some((usuario) => usuario.email === email)) {
      setMessage("Este e-mail já está cadastrado.");
      return;
    }

    // Adicionar usuário ao localStorage
    usuarios.push(formData);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso! Redirecionando para a página de login.");
    navigate("/login");
  };

  const validarCPF = (cpf) => {
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0,
      resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
  };

  const limparFormulario = () => {
    setFormData({
      email: "",
      senha: "",
      confirmaSenha: "",
      nome: "",
      cpf: "",
      dataNascimento: "",
      telefone: "",
      estadoCivil: "solteiro",
      escolaridade: "2º grau completo",
    });
    setMessage("");
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar loggedIn={false} />
      <div className="container mt-5 flex-grow-1">
        <h2 className="text-center">Cadastro de Clientes</h2>
        <div className="text-center mb-4">
          <img src="/assets/logo.png" alt="Logo da Empresa" />
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail:</label>
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
            <label htmlFor="senha" className="form-label">Senha:</label>
            <input
              type="password"
              className="form-control"
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              value={formData.senha}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmaSenha" className="form-label">Confirme a Senha:</label>
            <input
              type="password"
              className="form-control"
              id="confirmaSenha"
              name="confirmaSenha"
              placeholder="Confirme sua senha"
              value={formData.confirmaSenha}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="alert alert-info" role="alert">
            A senha deve atender aos seguintes requisitos:
            <ul>
              <li>Pelo menos 6 caracteres</li>
              <li>1 letra maiúscula</li>
              <li>1 número</li>
              <li>1 caractere especial (ex: @, #, $, %)</li>
            </ul>
          </div>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome:</label>
            <input
              type="text"
              className="form-control"
              id="nome"
              name="nome"
              placeholder="Digite seu nome completo"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpf" className="form-label">CPF:</label>
            <input
              type="text"
              className="form-control"
              id="cpf"
              name="cpf"
              placeholder="123.456.789-00"
              value={formData.cpf}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dataNascimento" className="form-label">Data de Nascimento:</label>
            <input
              type="date"
              className="form-control"
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="telefone" className="form-label">Telefone/WhatsApp:</label>
            <input
              type="tel"
              className="form-control"
              id="telefone"
              name="telefone"
              placeholder="(11) 91234-5678"
              value={formData.telefone}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Estado Civil:</label>
            <div>
              <input
                type="radio"
                id="solteiro"
                name="estadoCivil"
                value="solteiro"
                checked={formData.estadoCivil === "solteiro"}
                onChange={handleInputChange}
              />
              <label htmlFor="solteiro">Solteiro(a)</label>
              <input
                type="radio"
                id="casado"
                name="estadoCivil"
                value="casado"
                checked={formData.estadoCivil === "casado"}
                onChange={handleInputChange}
              />
              <label htmlFor="casado">Casado(a)</label>
              <input
                type="radio"
                id="divorciado"
                name="estadoCivil"
                value="divorciado"
                checked={formData.estadoCivil === "divorciado"}
                onChange={handleInputChange}
              />
              <label htmlFor="divorciado">Divorciado(a)</label>
              <input
                type="radio"
                id="viuvo"
                name="estadoCivil"
                value="viuvo"
                checked={formData.estadoCivil === "viuvo"}
                onChange={handleInputChange}
              />
              <label htmlFor="viuvo">Viúvo(a)</label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="escolaridade" className="form-label">Escolaridade:</label>
            <select
              id="escolaridade"
              name="escolaridade"
              className="form-select"
              value={formData.escolaridade}
              onChange={handleInputChange}
            >
              <option>1º grau incompleto</option>
              <option>1º grau completo</option>
              <option>2º grau completo</option>
              <option>nível superior</option>
              <option>pós-graduado</option>
            </select>
          </div>
          {message && <div className="text-danger mb-3">{message}</div>}
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-primary"
              onClick={validarCadastro}
            >
              Cadastrar
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

export default Register;
