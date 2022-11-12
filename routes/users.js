const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/register', (req, res, next) => {
  res.render('user/register', {layoutsDir: 'user', partialsDir: 'partials/navs'});
});

router.post('/register', (req, res, next) => {
  try {
    const {firstName, lastName, username, email, password} = req.body;
    const user = User.create({
      firstName,
      lastName,
      username,
      email,
      password
    });
    sendTokenResponse(user, 200, res);
  } catch (e) {
    res.status(400).json({message: `Could not add the new user: ${e.message}`});
  }
});

router.get('/login', (req, res, next) => {
  res.render('user/login');
});

router.post('/login', async (req, res, next) => {
  const {email, password} = req.body;
  if(!email || !password) {
    return next(new ErrorResponse('Please enter a valid email and password.', 400));
  }
  const user = await User.findOne({email}).select('+password');
  if(!user) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }
  const isMatched = await User.matchPassword(password);
  if(!isMatched) {
    return next(new ErrorResponse('Invalid Credentials', 401));
  }
  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + thirtyDays),
    httpOnly: true
  };
  if(process.env.NODE_ENV === 'production') {
    options.secure = true
  }
  res.status(statusCode)
      .cookie(token)
      .json({message: 'Cookie created.', token});
};

module.exports = router;
