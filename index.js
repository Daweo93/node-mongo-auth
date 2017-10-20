import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import config from './config';
import router from './router';

const app = express();

// DB setup
mongoose.connect(config.database, {
  useMongoClient: true
});

// App setup
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use('/', router);

// Server setup
const port = process.env.PORT || config.appDefaultPort;
const server = http.createServer(app);
server.listen(port);
console.log('Server is listining on port: ' + port);
