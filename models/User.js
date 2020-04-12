import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  organizationIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
    },
  ],
  createdAt: String,
  updatedAt: String,
})

export default model('User', userSchema)
