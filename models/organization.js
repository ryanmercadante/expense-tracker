import { model, Schema } from 'mongoose'

const organizationSchema = new Schema({
  name: String,
  password: String,
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  expenses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'expenses',
    },
  ],
  createdAt: String,
  updatedAt: String,
})

export default model('Organization', organizationSchema)
