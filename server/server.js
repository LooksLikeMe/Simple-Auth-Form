import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import User from './models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//init
const app = express()

//middlewares
app.use(express.json())
app.use(cors())
//config
const PORT = process.env.PORT || 8080

//connect to database
mongoose.connect(
  'mongodb+srv://admin:8I1EMNosxitN2eqi@cluster0.lnofl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
)
//API

//Gets

app.get('/api/quote', async (req, res) => {
  const token = req.headers['x-access-token']
  try {
    const decoded = jwt.verify(token, 'scrt')
    const email = decoded.email
    const user = await User.findOne({ email })

    return res.json({ status: 'ok', quote: user.quote })
  } catch (err) {
    res.json({ status: 'Error', err: 'Invalid token' })
  }
})

//POSTs
app.post('/api/register', async (req, res) => {
  const newPassword = await bcrypt.hash(req.body.password, 10)
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    })
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({
      status: 'error',
      err: 'Duplicate email',
    })
  }
})
app.post('/api/login', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  })
  if (!user) {
    return { status: 'error', error: 'Invalid login' }
  }
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      'scrt'
    )
    console.log(token)
    return res.json({ status: 'ok', user: token })
  } else {
    return res.json({ status: 'err', user: false })
  }
})

app.post('/api/quote', async (req, res) => {
  const token = req.headers['x-access-token']
  try {
    const decoded = jwt.verify(token, 'scrt')
    const email = decoded.email
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } })

    return res.json({ status: 'ok', message: req.body.quote })
  } catch (err) {
    res.json({ status: 'Error', err: 'Invalid token' })
  }
})

//listener
app.listen(PORT, () => {
  console.log(`Server has been start on ${PORT}`)
})
