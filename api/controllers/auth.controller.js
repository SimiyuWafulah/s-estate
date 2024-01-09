import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
  try {
    const {username, email, password} = req.body;
    const hashedPassword = await bcryptjs.Sync(password, 10)
    const newUser = new User ({username, email, password:hashedPassword});
    await newUser.save()
    res
    .status(201)
    .json({message: 'Account created successfully'});
  } catch (error) {
    console.log(error);
  }
}