import { getToken } from "./authServices"
import { EVENT_LIST_URL, NEW_EVENT_URL , EVENT_REGISTER_URL} from './constants';

// export const createNewEvent = async event => {
//   const token = getToken();
//   const apiParams = {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//       'authorization': `${token}`
//     },
//     body: JSON.stringify(event)
//   };
//   console.log(token);
//   console.log(event);
//   const response = await fetch(NEW_EVENT_URL, apiParams);
//   const resp = await response.json();
//   return resp;
// }

export const createNewEvent = async event => {
  const token = getToken();
  const formData = new FormData();
  const headers = new Headers();
  headers.append('authorization', `${token}`);
  const {name, desc, from, to, eventPoster, capacity, clubId} = event;
  formData.append('file', eventPoster);
  formData.append('name',name );
  formData.append('clubId', clubId);
  formData.append('desc',desc )
  formData.append('from',from )
  formData.append('to',to );
  formData.append('capacity', capacity);
  const apiParams = {
    method: 'POST',
    headers,
    body: formData
  };
  console.log(event);
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

export const fetchEventDetails = async id => {
  const token = getToken();
  const apiParams = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': `${token}`
    }
  };
  const url = `${NEW_EVENT_URL}/${id}`;
  const response = await fetch(url, apiParams);
  const res = await response.json();
  return res;
}

export const registerUser = async(userId, eventId) =>{
  const token = getToken();
  const apiParams = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `${token}`
    },
    body: JSON.stringify({userId, eventId})
  }
  const response = await fetch(EVENT_REGISTER_URL, apiParams);
  const res = await response.json();
  return res; 
}