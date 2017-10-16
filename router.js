import express from 'express';
import Authentication from './controllers/authentication';

const router = express.Router();
const authentication = new Authentication();

router.post('/signup', authentication.createUser);

export default router;
