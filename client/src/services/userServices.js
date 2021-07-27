import { getToken } from "./authServices"
import { USER_LIST_URL } from './constants';

export const fetchUserList = async ids => {
  const token = getToken();
  const apiParams = { 
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `${token}`
    },
    body: JSON.stringify({ids})
  };
  const response = await fetch(USER_LIST_URL, apiParams);
  const resp = await response.json();
  return resp;
}