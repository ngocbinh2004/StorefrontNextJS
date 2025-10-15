import axios from "axios";

let NextClient = () => {
  let instance = axios.create();

  //add interceptors
  instance.interceptors.request.use(
    (config) => {
      //Current, do nothing to intercept request from client

      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export default NextClient;
