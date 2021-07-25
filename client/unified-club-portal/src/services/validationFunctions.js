export const validateEmail = email => {
  return !!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email));
};

export const validateContact = contact => {
  return contact.length === 10;
};

export const isEmpty = str => {
  return (!str || str.length === 0 );
};

export const isBlank = str => {
  return (!str || /^\s*$/.test(str));
};