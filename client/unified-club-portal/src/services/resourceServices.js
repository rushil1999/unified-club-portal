import { getToken } from "./authServices";
import { GET_RESOURCE_URL } from './constants';

export const fetchResource = async id => {
  const token = getToken();
  const apiParams = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': `${token}`
    }
  }

  const url = `${GET_RESOURCE_URL}/${id}`;
  const response = await fetch(url, apiParams);
  const resp = await response.json();
  return ({
    status: response.status,
    data:resp
  })
}