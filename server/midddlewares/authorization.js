import models from '../models';

export default {

  /**
   * This method checks if the user making the request is an admin
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   */
  isAdmin(req, res, next) {
    models.Roles.findById(req.decoded.data.roleId)
      .then((role) => {
        if (role.title === 'Administrator') {
          return next();
        }
        return res.status(401)
          .send({
            message: 'Admin access is required',
          });
      })
      .catch(error => res.status(400)
        .send(error));
  },

  /**
   * This method checks if the user making the request is
   * the owner of the item
   *
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns next
   */
  isOwner(req, res, next) {
    const loggedInUserId = req.decoded.data.id;
    const loggedInUserRoleId = req.decoded.data.roleId;
    const documentId = req.params.documentId;
    const userId = req.params.userId;
    let documentUserId;
    if (loggedInUserRoleId === 1) {
      return next();
    } else if (documentId) {
      return models.Documents.findById(documentId)
        .then((document) => {
          documentUserId = document.userId;
          if (loggedInUserId === documentUserId) {
            return next();
          }
          return res.status(401)
            .json({
              message: 'unauthorized to perform this request',
            });
        })
        .catch(error => res.send(error));
    } else if (loggedInUserId === parseInt(userId, 10)) {
      return next();
    }
    return res.status(401)
      .json({
        message: 'unauthorized to perform this request',
      });
  },
};
