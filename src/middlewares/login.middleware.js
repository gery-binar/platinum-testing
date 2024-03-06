const JwtStrategy = require('passport-jwt');
const db = require('../models');
const { secret } = require('../configs/jwt.config');
const passport = require('passport')

const opts = {
  jwtFromRequest : JwtStrategy
    .ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : secret,
}

const jwtStrategy = new JwtStrategy.Strategy(
  opts,
  async (payload, done) => {

    // verifikasi apakah email didalam payload
    // jwt valid
    // jika valid dan ada usernya
    // maka fetch data user tsb
    const user = await db.User.findOne({
      where: { email: payload.email }
    })

    if(!user) {
      return done(null, false)
    }

    // notify passport kalau user terverified
    // lanjutkan prosess ke controller
    // dan populate req.user dengan data user
    return done(null, user)
  },
)

passport.use(jwtStrategy)

const jwtMiddleware = passport
  .authenticate('jwt', {session: false})

module.exports = {
  jwtMiddleware
}
