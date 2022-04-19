import React from "react";
import { Link } from "react-router-dom";
import { useAuthState, useAuthDispatch } from "../../providers/authProvider";
import "./index.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const Login = () => {
  const { onUpdate, onLogin } = useAuthDispatch();
  const { error, email, password } = useAuthState();

  return (
    <div className="App">
      <h1 className="login__title">Login</h1>
      {error && <p className="login__error">{error}</p>}
      <header className="App-header">
        <div className="Login">
          <TextField
            variant="standard"
            placeholder="Enter your email"
            margin="normal"
            required
            name="email"
            onChange={onUpdate}
            value={email || ""}
          />
          <TextField
            variant="standard"
            placeholder="Password"
            margin="normal"
            required
            name="password"
            type="password"
            onChange={onUpdate}
            value={password || ""}
          />

          <div className="Button">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                onLogin();
              }}
            >
              Log In
            </Button>
          </div>
        </div>
      </header>
    </div>
    // <section className="login">
    //     <h1 className="login__title">Login</h1>
    //     {error && <p className="login__error">{error}</p>}
    //     <form
    //         className="login__form"
    //         onSubmit={e => {
    //             e.preventDefault();
    //             onLogin();
    //         }}
    //     >
    //         <input
    //             type="text"
    //             value={email || ''}
    //             name="email"
    //             onChange={onUpdate}
    //             placeholder="Enter your email"
    //         />
    //         <br />
    //         <input
    //             type="password"
    //             value={password || ''}
    //             name="password"
    //             onChange={onUpdate}
    //             placeholder="Enter your password"
    //         />
    //         <br />
    //         <button className="login__button" type="submit">
    //             Login
    //         </button>
    //         <Link to="/register">Register</Link>
    //     </form>
    // </section>
  );
};

export default Login;
