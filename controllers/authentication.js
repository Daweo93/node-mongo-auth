import jwt from 'jwt-simple';
import UserModel from '../models/user';

import config from '../config';

export default class User {
  constructor() {
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  // Create token for user using JWT-Simple
  tokenForUser(user) {
    const timeStamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timeStamp }, config.secret);
  }

  signUp(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    // Check if password and email is provided
    if (!email || !password) {
      return res
        .status(422)
        .send({ error: 'You must provide email and password' });
    }

    // See if a user with the given email exist
    UserModel.findOne({ email: email }, (err, existingUser) => {
      if (err) {
        return next(err);
      }

      // If a user with email does exist, return an error
      if (existingUser) {
        return res.status(422).send({ error: 'Email is already used' });
      }

      // If a user with email does NOT exist, create and save user record
      const user = new UserModel({
        email: email,
        password: password
      });

      user.save(err => {
        if (err) {
          return next(err);
        }

        // Respond to request indicating the user was created
        res.json({ token: this.tokenForUser(user) });
      });
    });
  }

  signIn(req, res, next) {
    // User has already had their email and password auth'd
    // We just need to give him a token
    res.json({ token: this.tokenForUser(req.user) });
  }
}
