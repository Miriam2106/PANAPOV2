import * as instace from "axios";
const axios = instace.create({
  baseURL: "https://panaapo.herokuapp.com/api",
});

const requestHandler = (request) => {
  request.headers["Accept"] = "application/json";
  request.headers["Content-Type"] = "application/json";
  const token = localStorage.getItem("token") || null;
  if (token != null) {
    request.headers["Authorization"] = `Bearer${token}`;
  }
  return request;
};

const errorResponseHandler = (response) => {
  return Promise().reject({ ...response });
};

const successResponseHandler = (response) => {
  return response.data;
};

// Inteferir y cambiar el request.
axios.interceptors.request.use((request) => requestHandler(request));

//Interferir en la respuesta y hacer que utilice otros métodos.
axios.interceptors.response.use(
  (response) => successResponseHandler(response),
  (error) => errorResponseHandler(error)
);

export default axios;
