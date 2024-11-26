import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import logo from '../assets/logo.png';
import '../App.css';

const Navbar = () => {
  const { loggedIn, logout } = useAuth(); 

  const handleLogout = () => {
    logout(); 
    alert('Você foi desconectado com sucesso.');
  };

  return (
    <nav
      className='navbar navbar-expand-lg navbar-dark'
      style={{
        backgroundImage: "url('/assets/banner.png')",
        backgroundColor: '#010b26',
      }}
    >
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          <img src={logo} alt='Logo SphereTech' style={{ height: '40px' }} />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav ms-auto'>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                Página Inicial
              </Link>
            </li>
            {loggedIn ? (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/request-service'>
                    Solicitar Serviço
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/create-service'>
                    Criar Serviço
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login' onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login'>
                    Login
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/register'>
                    Cadastro
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
