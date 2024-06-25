const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT', 
  DELETE: 'DELETE'
};

function queryStringify(data: { [x: string]: string | number | boolean; }) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

class HTTPTransport {
  get = (url: string, options: {timeout?: number} = {}) => {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };

  delete = (url: string, options: {timeout?: number} = {}) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  post = (url: string, options: {timeout?: number} = {}) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };

  put = (url: string, options: {timeout?: number} = {}) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  }; 

  request = (url: string, options: {method: string, data?: {}, headers?: {[key: string]: string;}, timeout?: number}, timeout = 5000) => {
      const {method, data, headers = {}} = options;
  
      return new Promise((resolve, reject) => {
        if (!method) {
          reject('No method');
          return;
        }
    
        const xhr = new XMLHttpRequest();

        xhr.open(
          method, 
          (method === METHODS.GET) && !!data
          ? `${url}${queryStringify(data)}`
          : url,
        );
        
        for (const key in headers) {
          if (headers.hasOwnProperty(key)) {
            xhr.setRequestHeader(key, headers[key]);
          }
        }

        xhr.onload = function() {
          resolve(xhr);
        };
    
        xhr.onabort = reject;
        xhr.onerror = reject;
    
        xhr.timeout = timeout;
        xhr.ontimeout = reject;

        if ((method === METHODS.GET) || !data) {
          xhr.send();
        } else {
          xhr.send(data as XMLHttpRequestBodyInit);
        }
      });
    }
}
