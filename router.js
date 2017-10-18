import express from 'express';
import passport from 'passport';
import Authentication from './controllers/authentication';
import passportService from './services/passport';

const router = express.Router();
const authentication = new Authentication();
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.get('/', requireAuth, (req, res) => {
  res.send({ hi: 'there' });
});

router.post('/signin', requireSignin, authentication.signIn);
router.post('/signup', authentication.signUp);

export default router;
