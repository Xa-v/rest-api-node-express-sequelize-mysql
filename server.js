require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const errorHandler = require('_middleware/error-handler');




app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const corsOptions = {
  origin: ['https://kmdc-sample-api.onrender.com', 'https://main.d197akpax3jxmy.amplifyapp.com', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
};

app.use(cors(corsOptions));


app.get('/ping', (req, res) => {
  console.log('Ping received');
  res.status(200).send();  // Respond with no content (status 200)
});

setInterval(async () => {
  try {
    await axios.get(`https://kmdc-sample-api.onrender.com/ping`);
    console.log('Self-ping successful');
  } catch (error) {
    console.error('Error with self-ping', error);
  }
}, 5000);  // 10 minutes in milliseconds

app.use('/quote', require('./quotation/quotation.controller'));

app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('\n\n\n localhost: 4000'));
