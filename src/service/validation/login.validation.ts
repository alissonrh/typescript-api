import Joi from 'joi';
import Error from '../../interface/error.interface';
import Login from '../../interface/login.interface';

const validateLogin = (user: Login): Error => {
  const USERLOGIN = Joi.object({
    password: Joi.string().required(),
    username: Joi.string().required(),
  });

  const { error } = USERLOGIN.validate(user);
  if (error) {
    return { type: 400, message: error.message };
  }
  return { type: 200, message: '' };
};

export default validateLogin;