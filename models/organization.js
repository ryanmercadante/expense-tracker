import { model, Schema } from 'mongoose'

const organizationSchema = new Schema({
  name: String,
  createdAt: String,
  updatedAt: String,
})

export default model('Organization', organizationSchema)
