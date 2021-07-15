import mongoose from 'mongoose';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createJWT, verifyToken } from '../services/authenticationService';

export const signup = async (req, res) => {
  let { name, email, password, contact } = req.body;
  console.log('Request Body', req.body);
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(422).json({ errors: [{ user: "email already exists" }] });
    }
    else {
      const newUser = new User({
        _id: new mongoose.Types.ObjectId,
        name,
        email,
        password,
        contact,
        role: 'participant'
      });
      bcrypt.hash(password, 10)
        .then(async hash => {
          newUser.password = hash;
          const savedUser = await newUser.save();
          console.log(savedUser);
          if (savedUser) {
            let access_token = createJWT(
              user.email,
              user._id,
              3600
            );
            const tokenVerified = verifyToken(access_token);
            if(tokenVerified){
              res.status(201).json({
                   success: true,
                   token: access_token,
                   user: savedUser
                });
            }
            else{
              res.status(401).json({
                errors: ['Unauthorized User']
              });
            }
          }
          else {
            res.status(500).json({errors: ['Error Creating New User']});
          }
        })
        .catch(err => {
          console.log('Catch', err.message);
          res.status(500).json({ error: [err.message] });
        })
    }
  }
  catch (err) {
    console.log(err.message);
    res.status(500).json({ error: [err.message] });
  }
}


export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {   
      const { password: oldPassword } = user; 
      bcrypt.compare(password, user['password'], (err, result) => {
        if (err) {
          console.log('Password does not match', err.message);
          res.status(401).json({ errors: ['Password does not match; Unauthorized'] });
        }
        else {
          let access_token = createJWT(
            user.email,
            user._id,
            3600
          );
          const tokenVerified = verifyToken(access_token);
          if(tokenVerified){
            res.status(200).json({
                 success: true,
                 token: access_token,
                 user
              });
          }
          else{
            res.status(401).json({
              errors: ['Unauthorized User']
            });
          }
        }
      });
    }
    else {
      res.status(404).json({ errors: ['Could not find entity'] });
    }
  }
  catch (err) {
    res.status(500).json({errors:[err.message]});
  }
}

export const checkTokenValidation = (req, res) => {
  const { token } = req.params;
  const tokenVerified = verifyToken(token);
    if(tokenVerified){
      res.status(200).json({
            success: true,
            token,
        });
    }
    else{
      res.status(401).json({
        errors: ['Unauthorized User']
      });
    }
}

