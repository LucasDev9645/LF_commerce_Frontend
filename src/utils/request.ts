import axios, { AxiosRequestConfig } from "axios";

import { BASE_URL } from "./system";
import * as authService from "../services/auth-service";

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: "Bearer " + authService.getAccessToken(),
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};