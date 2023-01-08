// @flow
import { APICore } from './apiCore';

const api = new APICore();

function getCategorias(params: any): any {
  let queryString = '';
  if (params) {
    queryString = params
        ? Object.keys(params)
              .map((key) => key + '=' + params[key])
              .join('&')
        : '';
}
  const baseUrl = `https://instrumentos.autoevaluacion.com.co/v2/?${queryString}`;
  return api.create(`${baseUrl}`, params);
}

export { getCategorias};
