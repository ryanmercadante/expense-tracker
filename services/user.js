import User from '../models/User'

import { validateRegisterInput } from '../util/validators'

class UserService {
  static async register(registerInput) {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = registerInput
    try {
      // TODO: validate user input
      const { isValid, errors } = validateRegisterInput(registerInput)
      // TODO: make sure user doesnt exist
      const user = User.findOne({ email })
      if (user) {
        throw new UserInputError('Email is already taken', {
          errors: {
            email: 'Email is already taken',
          },
        })
      }
      // TODO: hash password and create an auth token

      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        createdAt: new Date().toISOString(),
      })
    } catch (err) {
      console.error('Something went wrong registering user:', err)
      throw new Error(err)
    }
  }
}

export default UserService
