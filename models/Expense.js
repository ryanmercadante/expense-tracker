import { model, Schema } from 'mongoose'

const expenseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  organizationId: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
  },
  createdAt: String,
  updatedAt: String,
})

export default model('Expense', expenseSchema)
