type HTTPMethod = (
  url: string,
  options?: { method?: string; data?: {}; headers?: { [key: string]: string }; timeout?: number },
  timeout?: number
) => Promise<unknown>;

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

function queryStringify(data: { [x: string]: string | number | boolean }) {
    if (typeof data !== 'object') {
        throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

class HTTPTransport {
    get: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

    delete: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

    post: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

    put: HTTPMethod = (url, options = {}) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

    request: HTTPMethod = (url, options = {}, timeout = 5000) => {
        const { method, data, headers = {} } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                reject(new Error('No method'));
                return;
            }

            const xhr = new XMLHttpRequest();

            xhr.open(method, method === METHODS.GET && !!data ? `${url}${queryStringify(data)}` : url);

            for (const [key, value] of Object.entries(headers)) {
                xhr.setRequestHeader(key, value);
            }

            function handleXhrLoad(xhr: unknown) {
                resolve(xhr);
            }

            xhr.onload = handleXhrLoad;

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(data as XMLHttpRequestBodyInit);
            }
        });
    };
}
