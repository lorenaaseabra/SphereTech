const ServicoTI = require('../models/ServicoTI');

const seedDatabase = async () => {
  try {
    // Check if "ServicoTI" data already exists
    const servicoCount = await ServicoTI.countDocuments();
    if (servicoCount === 0) {
      // Insert seed data into "ServicoTI"
      await ServicoTI.insertMany([
        {
          nome: 'Desenvolvimento Web',
          preco: 1500.0,
          descricao: 'Construção de sites responsivos e modernos.',
          prazo: 30,
        },
        {
          nome: 'Consultoria em TI',
          preco: 2000.0,
          descricao: 'Análise de infraestrutura e soluções de TI.',
          prazo: 15,
        },
        {
          nome: 'Manutenção de Redes',
          preco: 800.0,
          descricao: 'Serviço de manutenção e monitoramento de redes.',
          prazo: 7,
        },
      ]);
      console.log('ServicoTI seeded successfully.');
    } else {
      console.log('ServicoTI already exists, skipping seeding.');
    }
  } catch (error) {
    console.error('Error seeding the ServicoTI collection:', error);
  }
};

module.exports = seedDatabase;
