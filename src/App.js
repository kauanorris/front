import React, { useState } from "react";
import UserAccountForm from './useraccount';
import ProductDataForm from './product';
import UserLogin from './login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleNavClick = (page) => {
    setCurrentPage(page);
  }
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary bg-gradient">
        <a className="navbar-brand ms-2 text-dark" href="#" onClick={()=> handleNavClick('landing')}>Lojinha da Esquina </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="nav-link btn" onClick={()=> handleNavClick('createAccount')}>Criar conta</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn" onClick={()=> handleNavClick('login')}>Login</button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn me-2" onClick={()=> handleNavClick('logout')}>Sair</button>
            </li>
            <li className='nav-item'>
              <button className='nav-link btn' onClick={() => handleNavClick('products')}>Produtos</button>
            </li>
          </ul>
        </div>
      </nav>
      {/*Conteúdo Principal*/}
      <div className="container text-center mt-5">
        {currentPage === 'landing' && (
          <div className="mt-4">
            <h1 className="display-4">Segundo Bimestre</h1>
          </div>  
        )} 

        {/*Criar conta*/}
        {currentPage === 'createAccount' && (
          <div className="mt-4">
            <div>
              <UserAccountForm/>
            </div>
          </div>
        )}

        {/*Login*/}
        {currentPage === 'login' && (
          <div className="mt-4">
            <div>
              <UserLogin/>
            </div>
          </div>
        )}

        {/*Sair*/}
        {currentPage === 'logout' && (
          <div className="mt-4">
            <div>Adicionar o Sair</div>
          </div>
        )}

        {/*Produtos*/}
        {currentPage === 'products' && (
          <div className="mt-4">
            <div>
              <ProductDataForm/>
              </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;