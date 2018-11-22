import jwt from 'jsonwebtoken';
import models from '../models';

const secret = process.env.SECRET;
const User = models.Users;

export default {

  /**
   * This method verifies the token of the user making the request
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns next
   */
  verifyToken(req, res, next) {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.headers['x-access-token']) {
      token = req.headers['x-access-token'];
    }
    if (token) {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res.status(403)
            .send({
              message: 'Incorrect token.',
            });
        }
        User.findById(decoded.data.id)
          .then((user) => {
            if (!user) {
              return res.status(403)
                .send({
                  message: 'This user does not exist',
                });
            }
            req.decoded = decoded;
            return next();
          })
          .catch(error => res.status(400)
            .send({
              message: 'Error finding current users',
              error,
            }));
      });
    } else {
      return res.status(403)
        .send({
          message: 'No token provided.',
        });
    }
  },
};
