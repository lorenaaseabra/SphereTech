const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const clienteRoutes = require('./routes/clienteRoutes');
const servicoRoutes = require('./routes/servicoRoutes');
const solicitacaoRoutes = require('./routes/solicitacaoRoutes');
const seedDatabase = require('./seeder/seeder');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Conectado ao MongoDB');

    await seedDatabase();
  })
  .catch((err) => console.error('Erro ao conectar ao MongoDB', err));

// Routes
app.use('/api/clientes', clienteRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/solicitacoes', solicitacaoRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
