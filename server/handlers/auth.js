const db = require('../models');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    const {id, email, username} = user;
    const token = jwt.sign({id, email}, process.env.SECRET);

    return res.status(201).json({id, email, username, token });
  } catch(err){
    if(err.code === 11000){
      err.message = 'Sorry that email is aready registered';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.login = async (req, res, next) => {
  try{
    const user = await db.User.findOne({
      email: req.body.email
    });

    const {id, email, username} = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid){
      const token = jwt.sign({ id, email }, process.env.SECRET);
      return res.status(200).json({
        id,
        email,
        username,
        token
      });
    } else{
      throw new Error();
    }
  }catch(err){    
    // err.message ='Invalid Username/Password';
    // next(err);
    return next({ status: 400, message: 'Invalid Email/Password' });
  }
}