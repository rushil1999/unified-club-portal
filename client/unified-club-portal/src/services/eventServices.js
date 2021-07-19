import { getToken } from "./authServices"
import { EVENT_LIST_URL, NEW_EVENT_URL } from './constants';

export const createNewEvent = async event => {
  const token = getToken();
  const apiParams = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `${token}`
    },
    body: JSON.stringify(event)
  };
  console.log(token);
  const response = await fetch(NEW_EVENT_URL, apiParams);
  const resp = await response.json();
  return resp;
}

export const fetchEventList = async ids => {
  const token = getToken();
  const apiParams = { 
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `${token}`
    },
    body: JSON.stringify({ids})
  };
  const response = await fetch(EVENT_LIST_URL, apiParams);
  const resp = await response.json();
  return resp;
}