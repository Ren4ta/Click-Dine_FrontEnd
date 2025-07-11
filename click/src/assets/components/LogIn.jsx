import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';

const LogIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@testaurant.com');
  const [contrasena, setContrasena] = useState('hola');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mail: email, contrasena })
      });

      const data = await res.json();

      if (data.login_status === 'Login successful') {
        console.log('Sesión iniciada:', data);
        localStorage.setItem('user_id', data.id);
        localStorage.setItem('user_email', data.mail);
        localStorage.setItem('id_restaurante', data.id_restaurante);
        localStorage.setItem('id_tipo', data.id_tipo);
       if ()
        navigate('/categorias');
      } else {
        setError(data.login_status);
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión con el servidor.');
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="flex-column">
          <label>Email </label>
        </div>
        <div className="inputForm">
          <input
            type="text"
            className="input"
            placeholder="Ingrese su email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex-column">
          <label>Contraseña </label>
        </div>
        <div className="inputForm">
          <input
            type="password"
            className="input"
            placeholder="Ingrese su contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        <div className="flex-row">
          <div>
            <input type="checkbox" />
            <label>Recuerdame </label>
          </div>
          <span className="span">¿Olvidaste tu contraseña?</span>
        </div>

        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

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
  background-color: #fdf1dc;

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
