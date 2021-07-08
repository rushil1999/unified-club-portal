import express from 'express';
import mongoose from 'mongoose';
import clubRouter from './routes/club';
import authRouter from './routes/auth';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;
const CONNECTION_URL = 'mongodb+srv://rushil1999:rushil1999@cluster0.cuonx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

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


