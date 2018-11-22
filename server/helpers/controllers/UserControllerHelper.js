import jwt from 'jsonwebtoken';
import lodash from 'lodash';
import models from '../../models';

require('dotenv')
  .config();

const secret = process.env.SECRET;

/**
 * This class contains helper methods for
 * the user controller
 *
 * @class UserControllerHelper
 */
class UserControllerHelper {

  /**
   * This method signs the JWT token for user who login
   *
   * @static
   * @param {object} user
   * @returns {string} token
   *
   * @memberof UserControllerHelper
   */
  static signJwtToken(user) {
    const token = jwt.sign({
      data: user,
    }, secret, {
      expiresIn: '24h',
    });
    return token;
  }

  /**
   *  This method updates a user
   *
   * @static
   * @param {object} user
   * @param {object} res the response object
   * @param {object} req the request object
   * @returns {object} user
   *
   * @memberof UserControllerHelper
   */
  static isUpdateUser(user, res, req) {
    let response = {};
    if (!user) {
      response = res.status(404)
        .json({
          message: 'User not found',
        });
      return response;
    }
    return user
      .update({
        roleId: req.body.roleId || user.roleId,
        username: req.body.username || user.username,
        email: req.body.email || user.email,
        password: req.body.password || user.password,
        fullname: req.body.fullname || user.fullname,
      })
      .then(() => {
        response = res.status(200)
          .json({
            message: 'User updated successfully.',
            user,
          });
        return response;
      })
      .catch((error) => {
        response = res.status(400)
          .json({
            message: 'Error updating user.',
            error,
          });
        return error;
      });
  }

  /**
   * This method deletes a user
   *
   * @static
   * @param {object} user
   * @param {object} res the response object
   * @returns {string} message
   *
   * @memberof UserControllerHelper
   */
  static isDestroyUser(user, res) {
    let response = {};
    if (!user) {
      response = res.status(404)
        .json({
          message: 'User not found',
        });
      return response;
    }
    return user
      .destroy()
      .then(() => {
        response = res.status(200)
          .json({
            message: 'User deleted successfully.',
          });
        return response;
      })
      .catch((error) => {
        response = res.status(400)
          .json({
            error,
            message: 'Error encountered when deleting user',
          });
        return response;
      });
  }

  /**
   * This method logs in auser
   *
   * @static
   * @param {object} user
   * @param {object} res the request object
   * @param {object} req the response object
   * @returns {object} user
   *
   * @memberof UserControllerHelper
   */
  static isLoginUser(user, res, req) {
    let response = {};
    if (!user) {
      response = res.status(400)
        .json({
          form: 'Invalid Credentials',
          message: 'Authentication failed, user not found',
        });
      return response;
    } else if (user) {
      if (req.body.password === undefined) {
        response = res.status(400)
          .json({
            form: 'Invalid Credentials',
            message: 'Authentication failed, no password.',
          });
        return response;
      }
      if (!user.checkPassword(req.body.password)) {
        response = res.status(400)
          .json({
            form: 'Invalid Credentials',
            message: 'Authentication failed, wrong password.',
          });
        return response;
      }
      const secureUserDetails = {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        roleId: user.roleId,
        email: user.email,
      };
      const token = UserControllerHelper.signJwtToken(secureUserDetails);
      response = res.status(200)
        .json({
          message: 'User logged in',
          token,
        });
      return response;
    }
  }

  /**
   * This method validates a user input
   *
   * @static
   * @param {object} userDetails
   * @param {object} otherValidations
   * @returns {object} error
   *
   * @memberof UserControllerHelper
   */
  static validateInput(userDetails, otherValidations) {
    const { errors } = otherValidations(userDetails);
    const User = models.Users;
    return User.find({
      where: {
        $or: [{ email: userDetails.email }, { username: userDetails.username }],
      },
    }).then((user) => {
      if (user) {
        if (user.username === userDetails.username) {
          errors.username = 'This username already exists';
        }
        if (user.email === userDetails.email) {
          errors.email = 'This email already exists';
        }
      }
      const newError = errors;
      return {
        errors: newError,
        isValid: lodash.isEmpty(errors),
      };
    });
  }
}

export default UserControllerHelper;
