import jwt from 'jsonwebtoken';
import express_jwt from 'express-jwt';
const secret = 'hotelreverse';

export default {
  createToken: (user) => {
    return jwt.sign(user, secret, { expiresIn: 60*60*5 });
  },
  jwtCheck: express_jwt({
    secret: secret
  }),
}
