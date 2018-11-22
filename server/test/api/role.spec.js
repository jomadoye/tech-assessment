import chai from 'chai';
import chaiHttp from 'chai-http';
import helperUsers from '../../test-utility/helpers/api/helperUsers';
import helperRoles from '../../test-utility/helpers/api/helperRoles';

import server from '../../app';

process.env.NODE_ENV = 'test';
const fakeUserAdminForRoles = helperUsers.fakeUserAdminForRoles;
const invalidToken = helperUsers.invalidToken;
const newRole = helperRoles.newRole;
const unUniqueRoleTitle = helperRoles.unUniqueRoleTitle;
const emptyTitleRole = helperRoles.emptyTitleRole;
const nullTitleRole = helperRoles.nullTitleRole;

const should = chai.should();
chai.use(chaiHttp);

describe('Role API', () => {
  let userData;
  before((done) => {
    chai.request(server)
      .post('/users')
      .send(fakeUserAdminForRoles)
      .end((err, res) => {
        userData = res.body;
        done();
      });
  });

  describe('Create Role', () => {
    it('should create a new role ', (done) => {
      chai.request(server)
        .post('/api/roles')
        .set('x-access-token', userData.token)
        .send(newRole)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');

          res.body.should.have.property('message')
            .eql('Role created successfully');
          should.exist(res.body.message);
          done();
        });
    });

    it('should not create a role with empty title field', (done) => {
      chai.request(server)
        .post('/api/roles')
        .set('x-access-token', userData.token)
        .send(emptyTitleRole)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');

          res.body.message.should.eql('Error creating role');
          res.body.error.errors[0].message.should
            .eql('This role title cannot be empty');
          res.body.error.errors[0].type.should.eql('Validation error');
          res.body.error.errors[0].path.should.eql('title');
          done();
        });
    });

    it('should not create a role without title field', (done) => {
      chai.request(server)
        .post('/api/roles')
        .set('x-access-token', userData.token)
        .send(nullTitleRole)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');

          res.body.message.should.eql('Error creating role');
          res.body.error.errors[0].message.should.eql('title cannot be null');
          res.body.error.errors[0].type.should.eql('notNull Violation');
          res.body.error.errors[0].path.should.eql('title');
          done();
        });
    });

    it('should not create a role with an unUnique title', (done) => {
      chai.request(server)
        .post('/api/roles')
        .set('x-access-token', userData.token)
        .send(unUniqueRoleTitle)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.message.should.eql('Error creating role');
          res.body.error.errors[0].message.should
            .eql('This role already exist');
          res.body.error.errors[0].type.should.eql('unique violation');
          res.body.error.errors[0].path.should.eql('title');
          done();
        });
    });
  });

  describe('/GET Role', () => {
    it('should not GET all the roles if no token provided', (done) => {
      chai.request(server)
        .get('/api/roles')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('Object');

          res.body.should.have.property('message');
          res.body.should.have.property('message')
            .eql('No token provided.');
          done();
        });
    });

    it('should not GET roles no token provided', (done) => {
      chai.request(server)
        .get(`/api/roles/${userData.user.roleId}`)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('Object');

          res.body.should.have.property('message');
          res.body.should.have.property('message')
            .eql('No token provided.');
          done();
        });
    });

    it('should not GET roles if the token provided is invalid', (done) => {
      chai.request(server)
        .get('/api/roles')
        .set('x-access-token', invalidToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('Object');

          res.body.should.have.property('message');
          res.body.should.have.property('message')
            .eql('Incorrect token.');
          done();
        });
    });

    it('should GET roles', (done) => {
      chai.request(server)
        .get('/api/roles')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');

          res.body.message.should.eql('This are the roles');
          done();
        });
    });

    it('should GET roles by roleId', (done) => {
      chai.request(server)
        .get(`/api/roles/${1}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');

          res.body.message.should.eql('This is the role');
          done();
        });
    });
    it('should not GET un-existent roles by roleId', (done) => {
      chai.request(server)
        .get(`/api/roles/${9999999}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('Object');

          res.body.message.should.eql('This role does not exist');
          done();
        });
    });
  });

  describe('/DELETE Role', () => {
    it('should delete any role if admin', (done) => {
      chai.request(server)
        .delete('/api/roles/4')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');

          res.body.message.should.eql('Role deleted succesfully');
          done();
        });
    });

    it('should return error if roleId is invalid', (done) => {
      chai.request(server)
        .delete('/api/roles/jed')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('Object');

          res.body.message.should.eql('Error deleting role');
          done();
        });
    });

    it('should not delete non-existent roles', (done) => {
      chai.request(server)
        .delete(`/api/roles/${999999}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('Object');

          res.body.message.should.eql('Role not found');
          done();
        });
    });
  });
});
