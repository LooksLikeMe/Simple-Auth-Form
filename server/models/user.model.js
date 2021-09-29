import mongoose from 'mongoose'
const { Schema, model } = mongoose

const User = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quote: { type: String },
  },
  { collection: 'user-data' }
)
export default model('UserData', User)
