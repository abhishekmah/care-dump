import axios from "axios";

const setHeaderAuthToken = (token) => {
  if (token) {
    // mainAxios.defaults.headers.common['token'] = token;
  } else {
    delete mainAxios.defaults.headers.common["token"];
  }
};

const mainAxios = axios.create({
  //   baseURL: `${process.env.}`,
  //headers: { Token: jwtToken },
});

export function removeAuthToken() {}

mainAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      //   localStorage.removeItem("auth_token");
      //   window.location.replace("/sign-in");
      return;
    }
    return Promise.reject(error);
  }
);

export default setHeaderAuthToken;

export { mainAxios };
