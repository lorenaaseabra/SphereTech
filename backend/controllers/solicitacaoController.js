const SolicitacaoServico = require("../models/SolicitacaoServico");
const Cliente = require("../models/Cliente");

exports.getUserRequests = async (req, res) => {
  const { email } = req.body;
  try {
    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(404).json({ success: false, message: "Cliente não encontrado." });
    }

    const solicitacoes = await SolicitacaoServico.find({ cliente: cliente._id }).populate("servico");
    res.status(200).json({ success: true, data: solicitacoes });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateRequests = async (req, res) => {
  const { email, solicitacoes } = req.body;
  try {
    const cliente = await Cliente.findOne({ email });
    if (!cliente) {
      return res.status(404).json({ success: false, message: "Cliente não encontrado." });
    }

    // Remove todas as solicitações do cliente
    await SolicitacaoServico.deleteMany({ cliente: cliente._id });

    // Adiciona as novas solicitações
    const novasSolicitacoes = solicitacoes.map((solicitacao) => ({
      cliente: cliente._id,
      servico: solicitacao.servicoId,
      dataPrevista: solicitacao.dataPrevista,
    }));

    await SolicitacaoServico.insertMany(novasSolicitacoes);
    res.status(200).json({ success: true, message: "Solicitações atualizadas com sucesso." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
