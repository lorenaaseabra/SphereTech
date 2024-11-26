const Cliente = require('../models/Cliente');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.authenticate = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const cliente = await Cliente.findOne({ email });
    if (!cliente || !(await cliente.comparePassword(senha))) {
      return res
        .status(401)
        .json({ success: false, message: 'Credenciais inválidas.' });
    }
    const token = jwt.sign({ id: cliente._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return res.json({
      success: true,
      token,
      nome: cliente.nome,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.changePassword = async (req, res) => {
  const { email, senhaAtual, novaSenha } = req.body;
  try {
    const cliente = await Cliente.findOne({ email });
    if (!cliente || !(await cliente.comparePassword(senhaAtual))) {
      return res
        .status(401)
        .json({ success: false, message: 'Senha atual inválida.' });
    }
    cliente.senha = novaSenha;
    await cliente.save();
    return res.json({ success: true, message: 'Senha alterada com sucesso.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const clienteExistente = await Cliente.findOne({ email });
    if (clienteExistente) {
      return res
        .status(400)
        .json({ success: false, message: 'E-mail já cadastrado.' });
    }
    const cliente = new Cliente({ nome, email, senha });
    await cliente.save();
    return res
      .status(201)
      .json({ success: true, message: 'Cadastro realizado com sucesso.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
