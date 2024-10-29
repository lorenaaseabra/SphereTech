document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cpf").addEventListener("input", function () {
    mascaraCPF(this);
  });
});

function mascaraCPF(input) {
  let v = input.value.replace(/\D/g, "");

  // Aplica a máscara
  if (v.length > 3) v = v.replace(/(\d{3})(\d)/, "$1.$2");
  if (v.length > 6) v = v.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  if (v.length > 9)
    v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

  input.value = v;
}

document.addEventListener("DOMContentLoaded", function () {
  const telefoneInput = document.getElementById("telefone");
  telefoneInput.addEventListener("input", handlePhone);
});

const handlePhone = (event) => {
  let input = event.target;
  input.value = phoneMask(input.value);
};

const phoneMask = (value) => {
  if (!value) return "";
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d{5})(\d{4})$/, "$1-$2");

  return value.length > 15 ? value.slice(0, 15) : value;
};

function validarCadastro() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmaSenha = document.getElementById("confirmaSenha").value;
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const dataNascimento = document.getElementById("dataNascimento").value;
  const telefone = document.getElementById("telefone").value;
  const estadoCivil = document.querySelector(
    'input[name="estadoCivil"]:checked'
  ).value;
  const escolaridade = document.getElementById("escolaridade").value;
  const message = document.getElementById("message");

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    message.textContent = "Por favor, insira um e-mail válido.";
    return;
  }

  const senhaPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*!?\/\\|+_.=-]).{6,}$/;
  if (!senhaPattern.test(senha) || senha !== confirmaSenha) {
    message.textContent =
      "A senha deve atender aos requisitos e coincidir com a confirmação.";
    return;
  }

  const nomePattern = /^[A-Za-z]+(?: [A-Za-z]+)+$/;
  if (!nomePattern.test(nome) || nome.split(" ")[0].length < 2) {
    message.textContent =
      "O nome deve ter pelo menos duas palavras e a primeira palavra deve ter pelo menos 2 caracteres, sem caracteres especiais.";
    return;
  }

  const cpfNumeros = cpf.replace(/[^\d]/g, "");
  if (cpfNumeros.length !== 11 || !validarCPF(cpfNumeros)) {
    message.textContent = "CPF inválido.";
    return;
  }

  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  const idade = hoje.getFullYear() - nascimento.getFullYear();
  if (
    idade < 18 ||
    (idade === 18 &&
      hoje <
        new Date(
          hoje.getFullYear(),
          nascimento.getMonth(),
          nascimento.getDate()
        ))
  ) {
    message.textContent = "O cliente deve ser maior de idade.";
    return;
  }

  const telefonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
  if (telefone && !telefonePattern.test(telefone)) {
    message.textContent =
      "Telefone inválido. Utilize o formato (XX) XXXXX-XXXX.";
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  if (usuarios.some((usuario) => usuario.email === email)) {
    message.textContent = "Este e-mail já está cadastrado.";
    return;
  }

  usuarios.push({
    email: email,
    senha: senha,
    nome: nome,
    cpf: cpf,
    dataNascimento: dataNascimento,
    telefone: telefone,
    estadoCivil: estadoCivil,
    escolaridade: escolaridade,
  });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert(
    "Cadastro realizado com sucesso! Redirecionando para a página de login."
  );
  window.location.href = "login.html";
}

function validarCPF(cpf) {
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0,
    resto;
  for (let i = 1; i <= 9; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.substring(10, 11));
}

function limparFormulario() {
  document.getElementById("cadastroForm").reset();
  document.getElementById("message").textContent = "";
  document.getElementById("email").focus();
}
