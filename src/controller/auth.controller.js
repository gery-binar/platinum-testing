const { secret } = require('../configs/jwt.config');
const db = require('../models/index')
const jwt= require('jsonwebtoken')

const register = async (req, res) => {
  const {email, password} = req.body;

  const emailTaken = await db.User.findOne({
    where: {
      email,
    }
  })

  if(emailTaken != null) {
    return res.status(422).json({
      message: "Email taken"
    })
  }

  const user = await db.User.create({
    email, password,
  })

  res.json({
    data: {
      user,
    }
  })
}

const login = async (req, res) => {
  const {email, password} = req.body

  const user = await db.User.findOne({
    where: { email, password }
  })

  if(user) {
    // jwt hanya menyimpan email
    const token = jwt.sign(
      {
        email: user.email
      },
      secret,
    )

    return res.json({
      status: 200,
      data: {
        message: "logged in",
        token,
      }
    })
  }

  return res.json({
    status: 401,
    data: {
      message: "login failed"
    }
  })
}

module.exports = {register, login}
