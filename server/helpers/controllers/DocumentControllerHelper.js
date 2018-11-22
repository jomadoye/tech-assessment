import models from '../../models';
import paginate from '../../helpers/pagination/pagination';

const Document = models.Documents;

/**
 * This classs contains helpers methids for the document controller
 *
 * @class DocumentControllerHelper
 */
class DocumentControllerHelper {

  /**
   * The method dynamically creates the query for the document list controller
   *
   * @static
   * @param {object} req
   * @returns
   *
   * @memberof DocumentControllerHelper
   */
  static createQueryForList(req) {
    const limit = req.query.limit || 8;
    const offset = req.query.offset || 0;
    const query = {};
    if (limit || offset) {
      query.limit = limit;
      query.offset = offset;
    }
    const hasDecodedProperty =
    Object.prototype.hasOwnProperty.call(req, 'decoded');
    if (hasDecodedProperty) {
      const userId = req.decoded.data.id;
      const roleId = req.decoded.data.roleId;
      if (roleId === 1) {
        query.where = {};
      } else {
        query.where = {
          $or: [
            { access: 'public' },
            { userId },
            { $and: [{ ownerRoleId: roleId }, { access: 'role' }] },
          ],
        };
      }
    } else {
      query.where = {
        access: 'public',
      };
    }
    return query;
  }

  /**
   * This method checks if there are documents to be shown
   * in the document list controller
   *
   * @static
   * @param {object} document
   * @param {res} res the response object
   * @param {limit} limit
   * @param {offset} offset
   * @returns
   *
   * @memberof DocumentControllerHelper
   */
  static isDocumentList(document, res, limit, offset) {
    let response = {};
    if (!document) {
      response = res.status(404)
        .send({
          message: 'Documents Not Found',
        });
    } else {
      const documents = {
        count: document.count,
        rows: document.rows,
        metaData: paginate(document.count, limit, offset),
      };

      response = res.status(200)
        .json({
          message: 'Document is shown below',
          documents,
        });
    }
    return response;
  }

  /**
   * This method returns only the documents a user is authorized
   * to view from another user portfolio
   *
   * @static
   * @param {object} user
   * @param {object} res the response object
   * @param {object} req the request object
   * @returns
   *
   * @memberof DocumentControllerHelper
   */
  static isGetUserDocuments(user, res, req) {
    let response = {};
    const limit = req.query.limit || null;
    const offset = req.query.offset || 0;
    if (!user) {
      response = res.status(404)
        .json({

          message: 'User not found',
        });
    } else {
      const query = {
        where: {
          userId: req.params.userId,
        },
      };
      let documentCount;
      Document.count({ where: query.where }).then((countNumber) => {
        documentCount = countNumber;
        return documentCount;
      });
      return Document
        .findAll({
          where: query.where,
          limit,
          offset,
          include: [{
            model: models.Users,
            attributes: ['fullname'] }],
        })
        .then((documents) => {
          if (!documents) {
            response = res.status(404)
              .json({
                message: 'User has no document.',
              });
          } else if (req.decoded.data.id === 1 ||
          req.decoded.data.id === parseInt(req.params.userId, 10)) {
            response = res.status(200)
                .json({
                  message: 'This is the user document(s).',
                  count: documentCount,
                  documents,
                });
          } else {
            const authToViewDocuments = [];
            documents.forEach((document) => {
              if (document.access === 'public') {
                authToViewDocuments.push(document);
              }
            });
            response = res.status(200)
                .json({
                  message: 'This is the user document(s).',
                  authToViewDocuments,
                });
          }
          return response;
        })
        .catch(error => res.status(400)
          .json({
            message: 'Error retrieving document',
            error,
          }));
    }
  }

  /**
   * This method returns only the documents a user is authorized
   * to view
   *
   * @static
   * @param {object} document
   * @param {object} res the response object
   * @param {object} req the request object
   * @returns
   *
   * @memberof DocumentControllerHelper
   */
  static isRetrieveDocuments(document, res, req) {
    let response = {};
    if (!document) {
      response = res.status(404)
        .json({
          message: 'Document Not Found',
        });
    } else {
      const userId = req.decoded.data.id;
      const roleId = req.decoded.data.roleId;
      if (roleId !== 1) {
        if (document.userId !== userId && document.access === 'private') {
          response = res.status(403)
            .json({
              message: 'You dont have permission to view this document',
            });
        } else {
          response = res.status(200)
            .json({
              message: 'This is your document.',
              document,
            });
        }
      } else {
        response = res.status(200)
          .json({
            message: 'This is your document.',
            document,
          });
      }
    }
    return response;
  }

  /**
   * This method deletes a document from the database
   *
   * @static
   * @param {object} document
   * @param {object} res the response object
   * @returns
   *
   * @memberof DocumentControllerHelper
   */
  static isDestroyDocuments(document, res) {
    let response = {};
    if (!document) {
      response = res.status(404)
        .json({
          message: 'Document Not Found',
        });
    } else {
      response = document
        .destroy()
        .then(() => res.status(200)
          .json({
            message: 'Document deleted successfully.',
          }));
    }
    return response;
  }

  /**
   * This method updates a document
   *
   * @static
   * @param {object} document
   * @param {object} res the response object
   * @param {object} req the request object
   * @returns
   *
   * @memberof DocumentControllerHelper
   */
  static isUpdateDocuments(document, res, req) {
    let response = {};
    if (!document) {
      response = res.status(404)
        .json({
          message: 'Document Not Found',
        });
    } else {
      response = document
        .update({
          title: req.body.title || document.title,
          body: req.body.body || document.body,
          access: req.body.access || document.access,
        })
        .then(() => res.status(200)
          .json({
            message: 'Document successfuly updated',
            document,
          }));
    }
    return response;
  }
}

export default DocumentControllerHelper;
