import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import helperUsers from '../../test-utility/helpers/api/helperUsers';

process.env.NODE_ENV = 'test';

const should = chai.should();
const fakeUser = helperUsers.fakeUser;
chai.use(chaiHttp);

describe('User authentication API', () => {
  describe('Login API', () => {
    let loggedInUser;
    it('should login an already existing user', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({
          query: 'john doe',
          password: 'password',
        })
        .end((err, res) => {
          loggedInUser = res.body;
          res.should.have.status(200);
          res.body.message.should.eql('User logged in');
          done();
        });
    });

    it('should have a token for logged in users', (done) => {
      should.exist(loggedInUser.token);
      done();
    });

    it('should not authenthenticate fake users', (done) => {
      chai.request(server)
        .post('/users/login')
        .send(fakeUser)
        .end((err, res) => {
          loggedInUser = res.body;
          res.should.have.status(400);

          res.body.message.should.eql('Authentication failed, user not found');
          done();
        });
    });

    it('should not authenthenticate users with wrong password', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({
          query: 'john doe',
          password: 'wrongDassword',
        })
        .end((err, res) => {
          res.should.have.status(400);

          res.body.message.should.eql('Authentication failed, wrong password.');
          done();
        });
    });

    it('should not authenthenticate users without a token', (done) => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(403);

          res.body.message.should.eql('No token provided.');
          done();
        });
    });

    it('should not auth users with wrong username or email', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({
          query: 'jane doe',
          password: 'passsword',
        })
        .end((err, res) => {
          res.should.have.status(400);

          res.body.message.should.eql('Authentication failed, user not found');
          done();
        });
    });

    it('should not authenthenticate users with no password', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({
          query: 'john doe',
        })
        .end((err, res) => {
          res.should.have.status(400);

          res.body.message.should.eql('Authentication failed, no password.');
          done();
        });
    });
  });

  describe('Logout API', () => {
    it('should log a user out', (done) => {
      chai.request(server)
        .get('/api/users/logout')
        .end((err, res) => {
          res.should.have.status(200);

          res.body.message.should.eql('User logged out');
          done();
        });
    });
  });
});
