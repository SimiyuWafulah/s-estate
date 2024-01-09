import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const signup = async (req, res, next) => {
  try {
    const {username, email, password} = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10)
    const newUser = new User ({username, email, password:hashedPassword});
    await newUser.save()
    res
    .status(201)
    .json({message: 'Account created successfully'});
  } catch (error) {
    next(error)
  }
}

export const signin = async (req, res, next) => {
    try {
       const {email, password} = req.body;
       const validUser = await User.findOne({email});
       if(!validUser) return next(errorHandler(404, 'Account does not exist'));
       const validPassword = bcryptjs.compareSync(password, validUser.password);
       if(!validPassword) return next(errorHandler(404,'Wrong Credentials')); 
       const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET_KEY);
       const {password: pass, ...rest} = validUser._doc
       res
       .cookie('access_token', token , {httpOnly: true})
       .status(200)
       .json({message: 'Signed In Successfully'})
    } catch (error) {
        next(error)
    }
}