import models from '../models';
import paginate from '../helpers/pagination/pagination';

const User = models.Users;
const Document = models.Documents;

export default {

  /**
   * This method searches for a user by username
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user
   */
  searchUsers(req, res) {
    const query = req.query.q.trim()
      .split(' ')
      .map(searchWord => `%${searchWord}%`);
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;
    return User
      .findAndCountAll({
        where: {
          username: {
            $ilike: {
              $any: query,
            },
          },
        },
        limit,
        offset,
        include: [{
          model: Document,
          as: 'documents',
        }],
      })
      .then((user) => {
        if (!user) {
          res.status(404)
            .json({
              message: 'User not found.',
            });
        } else {
          const users = {
            count: user.count,
            metaData: paginate(user.count, limit, offset),
            users: user.rows,
          };
          res.status(200)
            .json({
              message: 'This is your user.',
              users,
            });
        }
      })
      .catch(error => res.status(400)
        .send(error));
  },

  /**
   * This method searches for a document by title
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} document
   */
  searchDocuments(req, res) {
    const query = req.query.q.trim()
      .split(' ')
      .map(searchWord => `%${searchWord}%`);
    const limit = req.query.limit || null;
    const offset = req.query.offset || 0;
    return Document
      .findAndCountAll({
        where: {
          title: {
            $ilike: {
              $any: query,
            },
          },
        },
        limit,
        offset,
        include: [{
          model: models.Users,
          attributes: ['fullname'] }],
      })
      .then((document) => {
        if (!document) {
          return res.status(404)
            .json({
              message: 'Document Not Found',
            });
        }
        const documents = {
          count: document.count,
          metaData: paginate(document.count, limit, offset),
          document: document.rows,
        };
        return res.status(200)
          .json({
            message: 'This is your document.',
            documents,
          });
      })
      .catch(error => res.status(400)
        .json({
          message: 'Document Not Found',
          error,
        }));
  },
};
