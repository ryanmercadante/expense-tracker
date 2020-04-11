import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserInputError } from 'apollo-server'

import User from '../models/User'
import { validateRegisterInput, validateLoginInput } from '../util/validators'
import { SECRET_KEY } from '../config/config'

class UserService {
  static _generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      SECRET_KEY,
      { expiresIn: '1h' },
    )
  }

  static async register(registerInput) {
    const { firstName, lastName, email, password } = registerInput

    try {
      // validate user input
      const { isValid, errors } = validateRegisterInput(registerInput)
      if (!isValid) {
        throw new UserInputError('Errors', { errors })
      }

      // make sure user doesnt exist
      const user = await User.findOne({ email })
      if (user) {
        throw new UserInputError('Email is already taken', {
          errors: {
            email: 'Email is already taken',
          },
        })
      }

      // hash password and create an auth token
      const hashedPassword = await bcrypt.hash(password, 12)
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      })

      const res = await newUser.save()
      const token = this._generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token,
      }
    } catch (err) {
      console.error('Something went wrong registering user:', err)
      throw new Error(err)
    }
  }

  static async login(email, password) {
    try {
      // validate user data
      const { isValid, errors } = validateLoginInput(email, password)
      if (!isValid) {
        throw new UserInputError('Errors', { errors })
      }

      // check if user exists
      const user = await User.findOne({ email })
      if (!user) {
        errors.general = 'User not found'
        throw new UserInputError('User not found', { errors })
      }

      // check if passwords match
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = 'Wrong credentials'
        throw new UserInputError('Wrong credentials', { errors })
      }

      // generate jwt for user
      const token = this._generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token,
      }
    } catch (err) {
      console.error('Something went wrong logging in:', err)
      throw new Error(err)
    }
  }
}

export default UserService
