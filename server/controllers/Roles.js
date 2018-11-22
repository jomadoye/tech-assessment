const Role = require('../models')
  .Roles;

module.exports = {

  create(req, res) {
    return Role
      .create({
        title: req.body.title,
      })
      .then(role => res.status(201)
        .json({
          message: 'Role created successfully',
          role,
        }))
      .catch(error => res.status(400)
        .json({
          message: 'Error creating role',
          error,
        }));
  },
  
  list(req, res) {
    return Role
      .all()
      .then(roles => res.status(200)
        .json({
          message: 'This are the roles',
          roles,
        }))
      .catch(error => res.status(400)
        .json({
          message: 'Error listing role',
          error,
        }));
  },
};
