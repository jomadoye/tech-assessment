import models from '../models';
import DocumentControllerHelper
from '../helpers/controllers/DocumentControllerHelper';

const Document = models.Documents;
const User = models.Users;
const createQuery = DocumentControllerHelper.createQueryForList;
const isDocumentList = DocumentControllerHelper.isDocumentList;
const isGetUserDocuments = DocumentControllerHelper.isGetUserDocuments;
const isRetrieveDocuments = DocumentControllerHelper.isRetrieveDocuments;
const isDestroyDocuments = DocumentControllerHelper.isDestroyDocuments;
const isUpdateDocuments = DocumentControllerHelper.isUpdateDocuments;

export default {

  /**
   * This method creates a document
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} document
   */
  create(req, res) {
    return Document
      .create({
        title: req.body.title,
        body: req.body.body,
        access: req.body.access,
        userId: req.params.userId || req.decoded.data.id,
        ownerRoleId: req.decoded.data.roleId,
      })
      .then(document => res.status(201)
        .json({
          message: 'Document created successfully.',
          document,
        }))
      .catch(error => res.status(400)
        .json({
          message: 'An error occured while creating this document.',
          error,
        }));
  },

  /**
   * This method updates a document
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} document
   */
  update(req, res) {
    return Document
      .find({
        where: {
          id: req.params.documentId,
        },
      })
      .then((document) => {
        const response = isUpdateDocuments(document, res, req);
        return response;
      })
      .catch(error => res.status(400)
        .json({
          message: 'Error encountered while updating',
          error,
        }));
  },

  /**
   * This method deletes a document
   *
   * @param {object} req
   * @param {object} res
   * @returns {string} error, message
   */
  destroy(req, res) {
    return Document
      .find({
        where: {
          id: req.params.documentId,
        },
      })
      .then((document) => {
        const response = isDestroyDocuments(document, res);
        return response;
      })
      .catch(error => res.status(400)
        .json({
          message: 'Error encountered while deleting user',
          error,
        }));
  },

  /**
   * This method gets a documents
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} document
   */
  retrieve(req, res) {
    return Document
      .find({
        where: {
          id: req.params.documentId,
        },
      })
      .then((document) => {
        const response = isRetrieveDocuments(document, res, req);
        return response;
      })
      .catch(error => res.status(400)
        .json({
          message: 'Error retrieving document',
          error,
        }));
  },

  /**
   * This method gets all documents
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} document
   */
  list(req, res) {
    const query = createQuery(req);
    const limit = query.limit;
    const offset = query.offset;
    return Document
      .findAndCount({
        where: query.where,
        offset: query.offset,
        limit: query.limit,
        include: [{
          model: models.Users,
          attributes: ['fullname'] }],
      })
      .then((document) => {
        const response = isDocumentList(document, res, limit, offset);
        return response;
      })
      .catch(error => res.status(400)
        .send(error));
  },

  /**
   * This method gets all documents for a specific user
   *
   * @param {object} req
   * @param {object} res
   */
  getUserDocuments(req, res) {
    User.findById(req.params.userId)
      .then((user) => {
        const response = isGetUserDocuments(user, res, req);
        return response;
      })
      .catch(error => res.status(400)
        .json({
          message: 'Error retrieving document',
          error,
        }));
  },
};
