import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import  http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import indexRoute from './routes/index';

dotenv.load();
// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

//app.use('/', publicPath);

// Parse incoming requests data 
app.use('/server/uploads', express.static(path.resolve(__dirname, './uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../client')));

indexRoute(app);

const port = parseInt(process.env.PORT, 10) || 3000;


app.listen(port, () => {
  console.log(`We are live on ${port}`);
});

app.get('/*', (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  } else {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  }
});

export default app;

