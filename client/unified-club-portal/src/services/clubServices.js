import { getToken } from "./authServices";
import { CLUB_LIST_URL, NEW_CLUB_URL, CLUB_ENROLL_URL, CLUB_LEAVE_URL } from "./constants"

export const fetchClubList = async () => {

  const token = getToken();
  const apiParams = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': `${token}`
    },
  }
  const response = await fetch(CLUB_LIST_URL, apiParams);
  const resp = await response.json();
  return resp;
}

export const createNewClub = async club => {
  const token = getToken();
  const apiParams = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': `${token}`,
    },
    body: JSON.stringify(club)
  }
  const response = await fetch(NEW_CLUB_URL, apiParams);
  const resp = await response.json();
  return resp;
} 

export const fetchClubDetails = async (clubId) => {
  const token = getToken();
  const apiParams = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'authorization': `${token}`
    }
  };
  const url = `${NEW_CLUB_URL}/${clubId}`;
  const response = await  fetch(url, apiParams);
  const resp = await response.json();
  return resp;
}

export const enrollMemberInClub = async (userId, clubId) => {
  const token = getToken();
  const apiParams = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'authorization': `${token}`
    },
    body: JSON.stringify({userId, clubId})
  };

  const response = await fetch(CLUB_ENROLL_URL, apiParams);
  const resp = await response.json();
  return resp;
}

export const removeMemberFromClub = async (userId, clubId) => {
  const token = getToken();
  const apiParams = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      'authorization': `${token}`
    },
    body: JSON.stringify({userId, clubId})
  };
  const response = await fetch(CLUB_LEAVE_URL, apiParams);
  const resp = await response.json();
  return resp;
}