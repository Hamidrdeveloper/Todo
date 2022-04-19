import validateEmail from "../utils/validateEmail";

const AuthService = {
  _url: process.env.REACT_APP_API_BASE_URL,

  _validateStringField(field, value) {
    if (typeof value !== "string" || !value.trim().length)
      throw Error(`${field} is not valid`);
  },

  _validateEmail(email) {
    if (!validateEmail(email)) throw Error(`${email} is not a valid email`);
  },

  _userId(userId) {
    if (typeof userId !== "undefined") {
      sessionStorage.setItem("userId", userId);

      return;
    }

    return sessionStorage.getItem("userId");
  },

  _token(token) {
    if (typeof token !== "undefined") {
      sessionStorage.setItem("token", token);

      return;
    }

    return sessionStorage.getItem("token");
  },

  isLoggedIn() {
    const res = !!(this._userId() && this._token());

    return res;
  },

  register(name, email, password,age) {

    var axios = require("axios");

    return Promise.resolve().then(() => {
      this._validateStringField("name", name);
      this._validateEmail(email);
      this._validateStringField("password", password);

      return axios
        .post(`${this._url}/users`, { name, email, password, age })
        .then((res) => {
          if (res.status === 201) {
            return res;
          }

          return res.json().then(({ message }) => {
            throw Error(message);
          });
        })
        .then((res) => {
          res.data.token;
          this._token(res.data.token);
          console.log(res.data.token);
        })
        .then(() => true);
    });
  },

  login(email, password) {
    var axios = require("axios");
    return Promise.resolve().then(() => {
      this._validateEmail(email);
      this._validateStringField("password", password);

      return axios
        .post(`${this._url}/users/login`, { email, password })
        .then((res) => {
          if (res.status === 200) {
            return res;
          }

          return res.json().then(({ message }) => {
            throw Error(message);
          });
        })
        .then((res) => {
          this._token(res.data.token);
          console.log(res.data.token);
          this._userId(res.data.user.id);
          return true;
        });
    });
  },

  logout() {
    return Promise.resolve().then(() => {
      sessionStorage.clear();

      return true;
    });
  },
};

export default AuthService;
