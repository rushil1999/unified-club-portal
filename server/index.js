import express from 'express';
import mongoose from 'mongoose';
import clubRouter from './routes/clubRoutes';
import authRouter from './routes/authRoutes';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

const result = dotenv.config()

if (result.error) {
  throw result.error
}

// console.log(result.parsed);

const app = express();
const PORT = process.env.PORT || 3000;
const CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cuonx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

//For CORS
app.use(cors());

//using boody-parser to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//establishing connection with db
mongoose.connect(CONNECTION_URL, connectionParams)
  .then(() => {
    console.log('Database connection established');
    app.listen(PORT, () => {
      console.log(`Application is listening on port ${PORT}`);
    })
  })
  .catch((err)=>{
    console.log(err.message);
  })

mongoose.set('useFindAndModify', false);

//setting primary routes
app.use('/clubs', clubRouter);
app.use('/club', clubRouter);
app.use('/auth', authRouter);


