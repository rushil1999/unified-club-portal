import Club from '../models/club';
import User from '../models/user';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


export const validateClubObject = async club => {
  const { name } = club;
  const alreadyExistingClub = await Club.find({ name: name });
  if (alreadyExistingClub.length<=0) {
    return { valid: true };
  }
  else {
    return {
      valid: false,
      status: 409,
      errors: ['Club of Similar Name already exists']
    }
  }
}

export const enrollmentValidation = (club) => {
  if ((club.members || []).length + 1 > club.memberCapacity) {
    return {
      valid: false,
      status: 412,
      errors: ['Limit Exceded']
    }
  }
  else {
    return {
      valid: true
    };
  }
}

export const generateRandomPassword = () => {
  var result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

export const createClubHandler = async club => {
  const { name } = club;
  const username = `${name}@email.com`;
  const contact = `${club['_id']}`;
  const password = generateRandomPassword();
  try {
    const existingUser = await User.findOne({ email: username });
    if (existingUser) {
      return {
        valid: false,
        status: 422,
        errors: ['Email already exists for creating club user']
      }
      
    }
    else {
      const newUser = new User({
        _id: new mongoose.Types.ObjectId,
        name,
        email: username,
        password,
        contact,
        role: 'clubHandler'
      });
      bcrypt.hash(password, 10)
        .then(async hash => {
          newUser.password = hash;
          const savedUser = await newUser.save();
          if (savedUser) {
            return {
              valid: true,
              user: savedUser,
              password
            };
          }
          else {
            return {
              valid: false,
              status: 500,
              errors: ['Error creating club user']
            }
          }
        })
        .catch(err => {
          console.log('Catch1', err.message);
          return {
            valid: false,
            status: 500,
            errors: [err.message]
          }
        })
    }
  }
  catch (err) {
    console.log('Catch2', err.message);
    return {
      valid: false,
      status: 500,
      errors: [err.message]
    }
  }
}