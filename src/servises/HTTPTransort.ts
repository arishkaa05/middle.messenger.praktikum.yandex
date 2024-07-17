import { HTTPMethod } from "../modules/types";
import { host } from "./BaseAPI";

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

function queryStringify(data: { [x: string]: string | number | boolean }) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`, "?");
}
export default class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  delete: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  post: HTTPMethod = (url, body: any, options: any = {}) => this.request(url, { ...options, method: METHODS.POST, data: body }, options.timeout);

  put: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  request(url: string, options: any = { method: METHODS.GET }, timeout = 5000): Promise<XMLHttpRequest> {
    const { data, headers = {}, withCredentials = true, responseType = "json", method } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error("No method"));
        return;
      }

      url = host + url;
      const xhr = new XMLHttpRequest();

      xhr.open(method as unknown as string, url);

      function handleXhrLoad(xhr: any) {
        if (xhr.target.status >= 200 && xhr.target.status < 300) {
          resolve(xhr.target.response);
        } else {
          reject(new Error(`Ошибка сервера: ${xhr.target.status} ${xhr.target.statusText}`));
        }
      }

      xhr.onload = handleXhrLoad;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      if (method === METHODS.GET && data) {
        url += queryStringify(data);
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      }

      xhr.timeout = timeout;
      xhr.responseType = responseType;
      xhr.withCredentials = withCredentials;

      xhr.send();
    });
  }
}
