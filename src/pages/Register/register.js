import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState, useAuthDispatch } from '../../providers/authProvider';
import './index.css';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
const Register = () => {
    const { onUpdate, onRegister } = useAuthDispatch();
    const { name, email, password, error,age } = useAuthState();
  
    return (
        <div className="register">
            <h1 className="register__title">Register</h1>
            {error && <p className="register__error">{error}!</p>}
            <header className="App-header">
        <div className="Login">
          <TextField
            variant="standard"
            placeholder="Enter your name"
            margin="normal"
            required
            name="name"
            onChange={onUpdate}
            value={name || ""}
          />
          <TextField
            variant="standard"
            placeholder="Enter your email"
            margin="normal"
            required
            name="email"
            type="text"
            onChange={onUpdate}
            value={email || ""}
          />
           <TextField
            variant="standard"
            placeholder="Enter your password"
            margin="normal"
            required
            name="password"
            type="password"
            onChange={onUpdate}
            value={password || ""}
          />
           <TextField
            variant="standard"
            placeholder="Enter your age"
            margin="normal"
            required
            name="age"
            type="number"
            onChange={onUpdate}
            value={age || ""}
          />

          <div className="Button">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                onRegister();
              }}
            >
              Register
            </Button>
          </div>
        </div>
      </header>
        </div>
    );
};

export default Register;
