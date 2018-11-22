import chai from 'chai';
import chaiHttp from 'chai-http';
import helperUsers from '../../test-utility/helpers/api/helperUsers';

import server from '../../app';

process.env.NODE_ENV = 'test';
const newUser = helperUsers.newUser;
const fakeUser = helperUsers.fakeUser;
const fakeUser3 = helperUsers.fakeUser3;
const fakeUser4 = helperUsers.fakeUser4;
const noUsername = helperUsers.noUsername;
const noEmail = helperUsers.noEmail;
const noPassword = helperUsers.noPassword;
const noFullname = helperUsers.noFullname;
const unUniqueUsername = helperUsers.unUniqueUsername;
const updateUsername = helperUsers.updateUsername;
const updateEmail = helperUsers.updateEmail;
const updateFullname = helperUsers.updateFullname;
const updateUsername1 = helperUsers.updateUsername1;
const unUniqueEmail = helperUsers.unUniqueEmail;
const invalidUserId = helperUsers.invalidUserId;
const emptyEmail = helperUsers.emptyEmail;
const emptyFullname = helperUsers.emptyFullname;
const emptyPassword = helperUsers.emptyPassword;
const emptyUsername = helperUsers.emptyUsername;
const invalidToken = 'aassccfftteteteteteet';

const should = chai.should();
chai.use(chaiHttp);

describe('User API', () => {
  let userData;
  let basicUser;
  before((done) => {
    chai.request(server)
      .post('/users')
      .send(newUser)
      .end((err, res) => {
        userData = res.body;
        done();
      });
  });

  describe('Create User', () => {
    it('should not create a user with empty username field', (done) => {
      chai.request(server)
        .post('/users')
        .send(emptyUsername)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('username')
            .eql('Username is required');
          should.exist(res.body.username);
          done();
        });
    });

    it('should not create a user with empty email field', (done) => {
      chai.request(server)
        .post('/users')
        .send(emptyEmail)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('email')
            .eql('This Email is invalid');
          done();
        });
    });

    it('should not create a user with empty fullname field', (done) => {
      chai.request(server)
        .post('/users')
        .send(emptyFullname)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('fullname')
            .eql('Fullname is required');
          done();
        });
    });

    it('should not create a user with empty password field', (done) => {
      chai.request(server)
        .post('/users')
        .send(emptyPassword)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('password')
            .eql('Password is required');
          done();
        });
    });

    it('should not create a user without username field', (done) => {
      chai.request(server)
        .post('/users')
        .send(noUsername)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors[0].should.have.property('path');
          res.body.errors[0].should.have.property('path')
            .eql('username');
          res.body.errors[0].should.have.property('type')
            .eql('notNull Violation');
          res.body.errors[0].should.have.property('message')
            .eql('username cannot be null');
          done();
        });
    });

    it('should not create a user without fullname field', (done) => {
      chai.request(server)
        .post('/users')
        .send(noFullname)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors[0].should.have.property('path');
          res.body.errors[0].should.have.property('path')
            .eql('fullname');
          res.body.errors[0].should.have.property('type')
            .eql('notNull Violation');
          res.body.errors[0].should.have.property('message')
            .eql('fullname cannot be null');
          done();
        });
    });

    it('should not create a user without email field', (done) => {
      chai.request(server)
        .post('/users')
        .send(noEmail)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors[0].should.have.property('path');
          res.body.errors[0].should.have.property('path')
            .eql('email');
          res.body.errors[0].should.have.property('type')
            .eql('notNull Violation');
          res.body.errors[0].should.have.property('message')
            .eql('email cannot be null');
          done();
        });
    });

    it('should not create a user without password field', (done) => {
      chai.request(server)
        .post('/users')
        .send(noPassword)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors[0].should.have.property('path');
          res.body.errors[0].should.have.property('path')
            .eql('password');
          res.body.errors[0].should.have.property('type')
            .eql('notNull Violation');
          res.body.errors[0].should.have.property('message')
            .eql('password cannot be null');
          done();
        });
    });

    it('should not create a user with an unUnique username', (done) => {
      chai.request(server)
        .post('/users')
        .send(unUniqueUsername)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('username')
            .eql('This username already exists');
          done();
        });
    });

    it('should not create a user with an unUnique email', (done) => {
      chai.request(server)
        .post('/users')
        .send(unUniqueEmail)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('email')
            .eql('This email already exists');
          done();
        });
    });

    it('should create a new user ', (done) => {
      chai.request(server)
        .post('/users')
        .send(fakeUser)
        .end((err, res) => {
          basicUser = res.body;
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message')
            .eql('User successfully created');
          done();
        });
    });

    it('should ensure new users have a role of basic ', (done) => {
      chai.request(server)
        .post('/users')
        .send(fakeUser3)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('message')
            .eql('User successfully created');
          res.body.user.should.have.property('roleId')
            .eql(3);
          done();
        });
    });

    it('should create a new user with valid credentials', (done) => {
      chai.request(server)
        .post('/users')
        .send(fakeUser4)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');

          res.body.should.have.property('message');
          res.body.should.have.property('token');
          res.body.user.should.have.property('id');
          res.body.user.should.have.property('roleId');
          res.body.user.should.have.property('fullname');
          res.body.user.should.have.property('username');
          res.body.user.should.have.property('email');
          res.body.user.should.have.property('password');
          res.body.user.should.have.property('updatedAt');
          res.body.user.should.have.property('createdAt');
          done();
        });
    });
  });

  describe('Search User by username', () => {
    it('should search for a user by username', (done) => {
      chai.request(server)
        .get(`/api/search/users/?q=${userData.user.username}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('This is your user.');

          done();
        });
    });

    it('should not find user if username does not exist', (done) => {
      chai.request(server)
        .get(`/api/search/users/?q=${userData.user.username}notExist`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.body.users.count.should.eql(0);
          done();
        });
    });

    it('should not find user if not admin', (done) => {
      chai.request(server)
        .get(`/api/search/users/?q=${userData.user.username}`)
        .set('x-access-token', basicUser.token)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.eql('Admin access is required');

          done();
        });
    });
  });

  describe('/GET User', () => {
    it('should not GET all the users if no token provided', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('Object');

          res.body.should.have.property('message');
          res.body.should.have.property('message')
            .eql('No token provided.');
          done();
        });
    });

    it('should not GET all the users if the token provided is invalid',
      (done) => {
        chai.request(server)
          .get('/api/users')
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

    it('should not GET a user by Id if no token provided', (done) => {
      chai.request(server)
        .get(`/api/users/${userData.id}`)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('Object');

          res.body.should.have.property('message');


          res.body.should.have.property('message')
            .eql('No token provided.');
          done();
        });
    });

    it('should not GET a user by Id if the token provided is invalid',
      (done) => {
        chai.request(server)
          .get(`/api/users/${userData.id}`)
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

    it('should GET users when limit and offset are set', (done) => {
      chai.request(server)
        .get('/api/users/?limit=10&offset=2')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });

    it('should GET users when limit and offset are not set', (done) => {
      chai.request(server)
        .get('/api/users/')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });

    it('should GET user by Id if Id exist', (done) => {
      chai.request(server)
        .get(`/api/users/${userData.user.id}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          done();
        });
    });

    it('should not GET user by Id if Id does not exist', (done) => {
      chai.request(server)
        .get(`/api/users/${invalidUserId}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('Object');
          res.body.should.have.property('message')
            .eql('User not found');
          done();
        });
    });
  });

  describe('/PUT User', () => {
    it('should update a user username', (done) => {
      chai.request(server)
        .put(`/api/users/${userData.user.id}`)
        .set('x-access-token', userData.token)
        .send(updateUsername)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          res.body.message.should.eql('User updated successfully.');

          done();
        });
    });

    it('should update a user email', (done) => {
      chai.request(server)
        .put(`/api/users/${userData.user.id}`)
        .set('x-access-token', userData.token)
        .send(updateEmail)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          res.body.message.should.eql('User updated successfully.');

          done();
        });
    });

    it('should update a user fullName', (done) => {
      chai.request(server)
        .put(`/api/users/${userData.user.id}`)
        .set('x-access-token', userData.token)
        .send(updateFullname)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          res.body.message.should.eql('User updated successfully.');

          done();
        });
    });

    it('should update a user with correct credentials', (done) => {
      chai.request(server)
        .get(`/api/users/${userData.user.id}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');
          res.body.username.should.eql('Omadoye Jedidiah');
          done();
        });
    });

    it('should not update user if user does not exist ', (done) => {
      chai.request(server)
        .put(`/api/users/${invalidUserId}`)
        .set('x-access-token', userData.token)
        .send(updateUsername)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('Object');
          res.body.message.should.eql('User not found');

          done();
        });
    });

    it('should not update user data with invalid id', (done) => {
      chai.request(server)
        .put('/api/users/jedidiah')
        .set('x-access-token', userData.token)
        .send(updateUsername)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('Object');

          res.body.message.should.eql('Error updating user.');
          done();
        });
    });

    it('should not update user data with invalid data', (done) => {
      chai.request(server)
        .put(`/api/users/${userData.id}`)
        .set('x-access-token', userData.token)
        .send(updateUsername)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('Object');

          res.body.message.should.eql('Error updating user.');
          done();
        });
    });

    it('user should update another user if having admin rights', (done) => {
      chai.request(server)
        .put('/api/users/20')
        .set('x-access-token', userData.token)
        .send(updateUsername1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');

          res.body.message.should.eql('User updated successfully.');
          done();
        });
    });

    it('user should not update another user if not an admin', (done) => {
      chai.request(server)
        .put('/api/users/20')
        .set('x-access-token', basicUser.token)
        .send({
          username: 'Omadoye ewo',
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('Object');

          res.body.message.should.eql('unauthorized to perform this request');
          done();
        });
    });
  });

  describe('/DELETE delete user', () => {
    it('should delete any user if admin', (done) => {
      chai.request(server)
        .delete('/api/users/20')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');

          res.body.message.should.eql('User deleted successfully.');
          done();
        });
    });

    it('should return error if userId is invalid', (done) => {
      chai.request(server)
        .delete(`/api/users/${userData.id}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('Object');

          res.body.message.should.eql('Error encountered when deleting user');
          done();
        });
    });

    it('should not delete non-existent users', (done) => {
      chai.request(server)
        .delete(`/api/users/${invalidUserId + 1}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('Object');

          res.body.message.should.eql('User not found');
          done();
        });
    });

    it('should not delete any user if not admin', (done) => {
      chai.request(server)
        .delete('/api/users/21')
        .set('x-access-token', basicUser.token)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('Object');

          res.body.message.should.eql('unauthorized to perform this request');
          done();
        });
    });

    it('should delete user if he owns the account', (done) => {
      chai.request(server)
        .delete(`/api/users/${basicUser.user.id}`)
        .set('x-access-token', basicUser.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('Object');

          res.body.message.should.eql('User deleted successfully.');
          done();
        });
    });
  });
});
