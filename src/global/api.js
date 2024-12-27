import axios from "axios";

/**
 * @author      Nandani.V.Patel
 * @date        26th December 2024
 * @description comman function of axios api call like post, get methods.
 * @param       api url and  req params
 * @response
 **/

const BACKEND_API = "http://localhost:5000/api/";

export function postRequestAPI({ url = "", data = {} }) {
  const fullUrl = `${BACKEND_API}${url}`;
  return axios.post(fullUrl, data);
}

export function getRequestAPI({ url = "", params = {} }) {
  return axios.get(`${BACKEND_API}${url}`, { params });
}

export function deleteRequestAPI({ url = "", params = {} }) {
  return axios.delete(`${BACKEND_API}${url}`, { params });
}
