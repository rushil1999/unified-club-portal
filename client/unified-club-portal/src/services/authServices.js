export const getToken = () => {
  return  window.localStorage.getItem('token');
}

export const updateUserInLocalStorage = user => {
  localStorage.setItem('user', user);
  
}