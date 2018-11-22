import controller from '../controllers';
import auth from '../midddlewares';

const usersController = controller.Users;
const rolesController = controller.Roles;
const authenticate = auth.authenticate;
const authorization = auth.authorization;

const verifyToken = authenticate.verifyToken;
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


  // Roles routes
  app
    .route('/api/roles')
    .get(rolesController.list)
    .post(rolesController.create);
};

export default Route;
