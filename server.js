const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const sessions = require('./routes/api/sessions')

app.use(bodyParser.json());
 
// db config
const db = 'mongodb+srv://brian:brian123@myscheema-tklpi.mongodb.net/test?retryWrites=true&w=majority'
 
// connect to MONGO
mongoose.connect(db, {useNewUrlParser: true }) 
  .then(() => console.log('Mongo DB connected...'))
  .catch(err => console.log(err))

  app.use('api/sessions', sessions)

  const port = process.env.port || 8080;
  app.listen(port, () => console.log(`server started on port ${port}`));

