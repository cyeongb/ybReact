import React from "react";
import { makeUseAxios } from "axios-hooks";
import axios from "axios";

const useAxios = makeUseAxios({
  axios: axios.create({ baseURL: "http://localhost:8282/" }),
});

export default useAxios;
