const ServicoTI = require("../models/ServicoTI");

exports.createService = async (req, res) => {
  const { nome, preco, descricao, prazo } = req.body;
  try {
    const servico = new ServicoTI({ nome, preco, descricao, prazo });
    await servico.save();
    res.status(201).json({ success: true, message: "Serviço cadastrado com sucesso." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllServices = async (req, res) => {
  try {
    const services = await ServicoTI.find();
    res.status(200).json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
