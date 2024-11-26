import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const CreateService = () => {
  const [service, setService] = useState({
    nome: '',
    preco: '',
    prazo: '',
    descricao: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !service.nome ||
      !service.preco ||
      !service.prazo ||
      !service.descricao
    ) {
      setMessage('Todos os campos são obrigatórios.');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:5000/api/servicos/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(service),
        }
      );
      const data = await response.json();
      if (data.success) {
        setMessage('Serviço criado com sucesso!');
        setService({ nome: '', preco: '', prazo: '', descricao: '' });
      } else {
        setMessage(data.message || 'Erro ao criar serviço.');
      }
    } catch (error) {
      setMessage('Erro ao criar serviço.');
    }
  };

  return (
    <div className='d-flex flex-column vh-100'>
      <Navbar loggedIn={true} />
      <div className='container mt-5 flex-grow-1'>
        <h2 className='text-center'>Criar Novo Serviço</h2>
        <form onSubmit={handleSubmit} className='my-4'>
          <div className='mb-3'>
            <label htmlFor='nome' className='form-label'>
              Nome do Serviço
            </label>
            <input
              type='text'
              className='form-control'
              id='nome'
              name='nome'
              value={service.nome}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='preco' className='form-label'>
              Preço
            </label>
            <input
              type='number'
              className='form-control'
              id='preco'
              name='preco'
              value={service.preco}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='prazo' className='form-label'>
              Prazo (dias)
            </label>
            <input
              type='number'
              className='form-control'
              id='prazo'
              name='prazo'
              value={service.prazo}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='descricao' className='form-label'>
              Descrição
            </label>
            <textarea
              className='form-control'
              id='descricao'
              name='descricao'
              rows='3'
              value={service.descricao}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type='submit' className='btn btn-primary'>
            Criar Serviço
          </button>
        </form>
        {message && <div className='text-danger mt-3'>{message}</div>}
      </div>
      <Footer />
    </div>
  );
};

export default CreateService;
