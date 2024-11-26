import React from 'react';
import '../App.css';

const Footer = () => (
  <footer className='footer-bg text-center text-lg-start mt-5'>
    <div className='container p-4'>
      <div className='row'>
        <div className='col-lg-4 col-md-6 mb-4'>
          <h5>Contatos</h5>
          <ul className='list-unstyled'>
            <li>
              <i className='fas fa-phone'></i> (81) 1234-5678
            </li>
            <li>
              <i className='fab fa-whatsapp'></i> (81) 91234-5678
            </li>
            <li>
              <i className='fas fa-envelope'></i>
              <a href='mailto:contato@empresa.com'>contato@empresa.com</a>
            </li>
          </ul>
        </div>
        <div className='col-lg-4 col-md-6 mb-4'>
          <h5>Endereço</h5>
          <p>Avenida Cais do Apolo, 123 - Marco Zero, Recife - PE</p>
        </div>
        <div className='col-lg-4 col-md-12 mb-4'>
          <h5>Formas de Pagamento</h5>
          <i className='fas fa-credit-card'></i>{' '}
          <i className='fas fa-barcode'></i>{' '}
          <i className='fas fa-university'></i>
        </div>
      </div>
    </div>
    <div className='text-center p-3 bg-dark text-white'>
      &copy; 2024 SphereTech. Todos os direitos reservados.
    </div>
  </footer>
);

export default Footer;
