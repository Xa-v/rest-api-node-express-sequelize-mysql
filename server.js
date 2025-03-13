require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

app.use('/users', require('./users/users.controller'));
app.use('/login', require('./user-authentication/auth.controller'));

app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('\n\n\n https://github.com/Xa-v'));
