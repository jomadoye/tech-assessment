import controller from '../controllers';
import auth from '../midddlewares';

const usersController = controller.Users;
const documentsController = controller.Documents;
const searchController = controller.Search;
const rolesController = controller.Roles;
const authenticate = auth.authenticate;
const authorization = auth.authorization;

const verifyToken = authenticate.verifyToken;
const isAdmin = authorization.isAdmin;
const isOwner = authorization.isOwner;

const Route = (app) => {
  app
    .route('/users/login')
    .post(usersController.login);

  app
    .route('/users')
    .post(usersController.create);

  app
    .route('/api/users/logout')
    .get(usersController.logout);

  // apply the routes to our application with the prefix /api
  app.use('/api', verifyToken);

  // User routes
  app
    .route('/api/users')
    .get(usersController.list);

  app
    .route('/api/users/:userId')
    .get(usersController.retrieve)
    .put(isOwner, usersController.update)
    .delete(isOwner, usersController.destroy);

  // User-Document routes
  app
    .route('/api/users/:userId/documents')
    .post(isOwner, documentsController.create)
    .get(documentsController.getUserDocuments);

  // Documents routes
  app
    .route('/api/documents/:documentId')
    .get(documentsController.retrieve)
    .put(isOwner, documentsController.update)
    .delete(isOwner, documentsController.destroy);

  app
    // TODO Get all authorized documents
    .route('/api/documents')
    .get(documentsController.list)
    .post(documentsController.create);
  app
    // TODO Get all public documents
    .route('/documents')
    .get(documentsController.list);

  // Roles routes
  app
    .route('/api/roles')
    .get(isAdmin, rolesController.list)
    .post(isAdmin, rolesController.create);

  app
    .route('/api/roles/:roleId')
    // .put(isAdmin, rolesController.update)
    .get(isAdmin, rolesController.retrieve)
    .delete(isAdmin, rolesController.destroy);

  app
    .route('/api/search/users')
    .get(isAdmin, searchController.searchUsers);

  app
    .route('/api/search/documents')
    .get(searchController.searchDocuments);

  app
    .route('/users/validate/:query')
    .get(usersController.isUserExist);
};

export default Route;
