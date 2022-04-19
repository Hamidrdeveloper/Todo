import validateEmail from "../utils/validateEmail";

const TaskService = {
  _url: process.env.REACT_APP_API_BASE_URL,

  _validateStringField(field, value) {
    if (typeof value !== "string" || !value.trim().length)
      throw Error(`${field} is not valid`);
  },

  _token() {
    return sessionStorage.getItem("token");
  },

  addTask(description, completed) {
    const age = 29;
    var axios = require("axios");
    const headers = { Authorization: `Bearer ${this._token()}` };
    return Promise.resolve().then(() => {
      return axios
        .post(`${this._url}/tasks`, { description, completed }, { headers })
        .then((res) => {
          if (res.status === 201) {
            return res;
          }

          return res.json().then(({ message }) => {
            throw Error(message);
          });
        })
        .then((res) => {
          console.log(res.data);
        })
        .then(() => true);
    });
  },
  deleteTask(id) {
    var axios = require("axios");
    const headers = { Authorization: `Bearer ${this._token()}` };
    return Promise.resolve().then(() => {
      return axios
        .delete(`${this._url}/tasks/${id}`, { headers })
        .then((res) => {
          if (res.status === 201) {
            return res;
          }

          return res.json().then(({ message }) => {
            throw Error(message);
          });
        })
        .then((res) => {
          console.log(res.data);
        })
        .then(() => true);
    });
  },
  updateTask(description, completed, id) {
    var axios = require("axios");
    const headers = { Authorization: `Bearer ${this._token()}` };
    return Promise.resolve().then(() => {
      return axios
        .patch(
          `${this._url}/tasks/${id}`,
          { description, completed },
          { headers }
        )
        .then((res) => {
          if (res.status === 201) {
            return res;
          }

          return res.json().then(({ message }) => {
            throw Error(message);
          });
        })
        .then((res) => {
          console.log(res.data);
        })
        .then(() => true);
    });
  },
  getTask() {
    var axios = require("axios");
    const headers = { Authorization: `Bearer ${this._token()}` };
    return axios.get(`${this._url}/tasks`, {headers})
      .then(({data}) =>data);
  },
};

export default TaskService;
