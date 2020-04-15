import { model, Schema } from 'mongoose'

const organizationSchema = new Schema({
  name: String,
  password: String,
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  expenses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Expense',
    },
  ],
  createdAt: String,
  updatedAt: String,
})

export default model('Organization', organizationSchema)
