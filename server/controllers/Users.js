import models from '../models';
import UserControllerHelper from '../helpers/controllers/UserControllerHelper';
import commonValidations from '../shared/validations/signup/signupValidation';
import paginate from '../helpers/pagination/pagination';

require('dotenv')
  .config();

const User = models.Users;
const signJwtToken = UserControllerHelper.signJwtToken;
const isUpdateUser = UserControllerHelper.isUpdateUser;
const isDestroyUser = UserControllerHelper.isDestroyUser;
const isLoginUser = UserControllerHelper.isLoginUser;
const validateInput = UserControllerHelper.validateInput;

export default {

  create(req, res) {
    validateInput(req.body, commonValidations)
      .then(({
        errors,
        isValid,
      }) => {
        if (isValid === true) {
          return User
            .create(req.body)
            .then((user) => {
              const secureUserDetails = {
                id: user.id,
                username: user.username,
                fullname: user.fullname,
                roleId: user.roleId,
                email: user.email,
              };
              const token = signJwtToken(secureUserDetails);
              res.status(201)
                .json({
                  message: 'User successfully created',
                  token,
                  user,
                });
            })
            .catch(error => res.status(400)
              .send(error));
        }
        return res.status(400)
          .send(errors);
      });
  },

  list(req, res) {
    const limit = req.query.limit || null;
    const offset = req.query.offset || 0;
    return User
      .findAndCount({
        limit,
        offset,
      })
      .then((users) => {
        const user = {
          count: users.count,
          rows: users.rows,
          metaData: paginate(users.count, limit, offset),
        };
        res.status(200)
        .send(user);
      })
      .catch(error => res.status(400)
        .send(error));
  },

  retrieve(req, res) {
    return User
      .findById(req.params.userId, {
        attributes: ['username', 'email', 'fullname', 'id', 'roleId'],
      })
      .then((user) => {
        if (!user) {
          res.status(404)
            .send({
              message: 'User not found',
            });
        } else {
          res.status(200)
            .send(user);
        }
      })
      .catch(error => res.status(400)
        .send(error));
  },

  update(req, res) {
    return User
      .findById(req.params.userId)
      .then((user) => {
        const response = isUpdateUser(user, res, req);
        return response;
      })
      .catch(error => res.status(400)
        .json({
          error,
          message: 'Error updating user.',
        }));
  },

  destroy(req, res) {
    return User
      .findById(req.params.userId)
      .then((user) => {
        const response = isDestroyUser(user, res);
        return response;
      })
      .catch(error => res.status(400)
        .json({
          error,

          message: 'Error encountered when deleting user',
        }));
  },
  login(req, res) {
    const loginQuery = req.body.query;
    return User.find({
      attributes: ['username', 'password', 'email', 'id', 'fullname', 'roleId'],
      where: {
        $or: [{ email: loginQuery }, { username: loginQuery }],
      },
    }).then((user) => {
      const response = isLoginUser(user, res, req);
      return response;
    })
      .catch(error => res.status(400)
        .json({

          message: 'Error logging',
          error,
        }));
  },

  logout(req, res) {
    res.setHeader['x-access-token'] = ' ';
    res.status(200)
      .json({
        message: 'User logged out',
      });
  },
};
