import mongoose from 'mongoose';
import User from '../models/user';


export const getUserList = async (req, res) => {
  const ids = req.body.ids;
  try{
    const users = ids.map(async id => {
      const user = await User.findById(id).exec();
      
      if(user){
        return user;
      }
    });
    const userList = await Promise.all(users);
    res.status(200).json({
      success: true,
      data: userList
    });
  }
  catch(err){
    console.log('Catch', err.message);
    res.status(500).json({
      errors: [err.message]
    })
  }
  
}