import { getToken } from "./authServices"
import { EVENT_LIST_URL, NEW_EVENT_URL, EVENT_REGISTER_URL } from './constants';
import { isBlank, isEmpty } from "./validationFunctions";

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
//   const response = await fetch(NEW_EVENT_URL, apiParams);
//   const resp = await response.json();
//   return resp;
// }

export const createNewEvent = async event => {
  const token = getToken();
  const formData = new FormData();
  const headers = new Headers();
  headers.append('authorization', `${token}`);
  const { name, desc, from, to, eventPoster, capacity, clubId, venue } = event;
  formData.append('file', eventPoster);
  formData.append('name', name);
  formData.append('clubId', clubId);
  formData.append('desc', desc)
  formData.append('from', from)
  formData.append('to', to);
  formData.append('capacity', capacity);
  formData.append('venue', venue);
  if (event['_id']) {
    formData.append('_id', event['_id']);
  }
  const apiParams = {
    method: 'POST',
    headers,
    body: formData
  };
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
    body: JSON.stringify({ ids })
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

export const registerUser = async (userId, eventId) => {
  const token = getToken();
  const apiParams = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `${token}`
    },
    body: JSON.stringify({ userId, eventId })
  }
  const response = await fetch(EVENT_REGISTER_URL, apiParams);
  const res = await response.json();
  return res;
}

export const validateEventObject = event => {
  const { name, desc, capacity, from, to, venue } = event;
  const errors = [];
  if (isBlank(name) || isEmpty(name)) {
    errors.push('Name Cannot be Blank');
  }
  if (isBlank(desc) || isEmpty(desc)) {
    errors.push('Description Cannot be Blank');
  }
  if (isBlank(venue) || isEmpty(venue)) {
    errors.push('Venue Cannot be Blank');
  }
  if (capacity <= 1) {
    errors.push('Capacity must be greater than 1');
  }
  if (!to || !from) {
    errors.push('Field Cannot be empty');
  }
  else {
    const toTimeStamp = new Date(to).getTime();
    const fromTimeStamp = new Date(from).getTime();
    if (toTimeStamp < fromTimeStamp) {
      errors.push('Date must be after start date');
    }
  }
  return errors;
}


export const getEventStatus = (startDate, endDate) => {
  const currentTime = new Date().getTime();
  const startTime = new Date(startDate).getTime();
  const endTime = new Date(endDate).getTime();
  if (currentTime + 7200000 >= startTime && currentTime + 7200000 < endTime) {
    return 0;
  }
  else if (currentTime + 7200000 < startTime) {
    return -1;
  }
  else if (currentTime > endTime) {
    return 2;
  }
  else if (currentTime > startTime && currentTime < endTime) {
    return 1;
  }
}

export const getDateTimeLocal = time => {
  const d = new Date(time);
  const localDateTime = [(d.getMonth() + 1).AddZero(),
    d.getDate().AddZero(),
    d.getFullYear()].join('/') + ', ' +
      [d.getHours().AddZero(),
      d.getMinutes().AddZero()].join(':');
    
    return localDateTime;
}
