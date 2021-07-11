import jwt from 'jsonwebtoken';

export const createJWT = (email, userId, duration) => {
   const payload = {
      email,
      userId,
      duration
   };
   return jwt.sign(payload, process.env.TOKEN_SECRET, {
     expiresIn: duration,
   });
};


export const checkUserAccess = (req,res, next) => {
   const accessToken = req.headers['authorization'];
   const accessGranted = verifyToken(accessToken);
   if(accessGranted){
      next();
   }
   else{
      res.status(401).json({
         errors: ['Unauthorized User']
      })
   }     
}


export const verifyToken = (accessToken) => {
   let accessGranted;
   jwt.verify(accessToken, process.env.TOKEN_SECRET, (err,
      decoded) => {
      if (err) {
         accessGranted =  false;
      }
      if (decoded) {
         accessGranted = true;
      }

    });
    return accessGranted;
}