import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';

const LogIn = () => {
  const navigate = useNavigate(); // Hook para navegar entre rutas

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías agregar la lógica de autenticación
    console.log('Iniciando sesión...');
    navigate('/categorias'); // Redirige a la página de categorías
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className="inputForm">
          <svg height={20} viewBox="0 0 32 32" width={20} xmlns="http://www.w3.org/2000/svg">
            <g id="Layer_3" data-name="Layer 3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
            </g>
          </svg>
          <input type="text" className="input" placeholder="Ingrese su email" />
        </div>
        <div className="flex-column">
          <label>Contraseña </label>
        </div>
        <div className="inputForm">
          <svg height={20} viewBox="-64 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg">
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
          </svg>
          <input type="password" className="input" placeholder="Ingrese su contraseña" />
        </div>
        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>Recuerdame </label>
          </div>
          <span className="span">Olvidaste tu contraseña?</span>
        </div>
        <button type="submit" className="button-submit">Inicia Sesión</button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #fef6e4;

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #ffffff;
    padding: 40px;
    width: 100%;
    max-width: 600px;
    border-radius: 25px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.15);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
    font-size: 16px;
  }

  .inputForm {
    position: relative; /* Necesario para posicionar el ícono del ojito */
    border: 1.5px solid #ecedec;
    border-radius: 12px;
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    transition: 0.2s ease-in-out;
  }

  .input {
    margin-left: 15px;
    border-radius: 10px;
    border: none;
    width: 90%; 
    height: 100%;
    font-size: 16px;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .password-icon {
    position: absolute;
    right: 15px; 
    cursor: pointer;
    color: #7d7d7d; 
    font-size: 18px; 
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 15px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 15px;
    color: black;
    font-weight: 400;
  }

  .span {
    font-size: 15px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin-top: 30px;
    background-color: #668BBC; 
    border: none;
    color: white;
    font-size: 18px;
    font-weight: 500;
    border-radius: 12px;
    height: 60px;
    width: 100%;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .button-submit:hover {
    background-color: #003049;
  }
`;




export default LogIn;
