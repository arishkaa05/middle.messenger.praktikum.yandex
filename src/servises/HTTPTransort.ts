import queryStringify from '../helpers/queryStringify';
import { HTTPMethod } from '../modules/types';
import { host } from './BaseAPI';

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

export default class HTTPTransport {
    get: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

    delete: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

    post: HTTPMethod = (url, body: any, options: any = {}) => this.request(url, { ...options, method: METHODS.POST, data: body }, options.timeout);

    put: HTTPMethod = (url, body: any, options: any = {}) => this.request(url, { ...options, method: METHODS.PUT, data: body }, options.timeout);

    request(url: string, options: any = { method: METHODS.GET }, timeout = 5000): Promise<XMLHttpRequest> {
        const {
            data, headers = {}, withCredentials = true, responseType = 'json', method,
        } = options;

        return new Promise((resolve, reject) => {
            url = host + url;
            const xhr = new XMLHttpRequest();
            xhr.open(method as unknown as string, url);

            xhr.onload = () => {
                const status = xhr.status || 0;
                if (status >= 200 && status < 300) {
                    resolve(xhr.response);
                } else {
                    reject(new Error(`Ошибка сервера: ${xhr.status} ${xhr.statusText}`));
                }
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            Object.keys(headers).forEach((key) => {
                xhr.setRequestHeader(key, headers[key]);
            });

            if (method === METHODS.GET && data) {
                url += queryStringify(data);
            }

            xhr.timeout = timeout;
            xhr.responseType = responseType;
            xhr.withCredentials = withCredentials;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
                xhr.send(JSON.stringify(data));
            }
        });
    }
}
