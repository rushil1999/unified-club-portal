import jwt from 'jsonwebtoken';

export const createJWT = (email, userId, duration) => {
   const payload = {
      email,
      userId,
      duration
   };
   return jwt.sign(payload, 'rushil1999', {
     expiresIn: duration,
   });
};