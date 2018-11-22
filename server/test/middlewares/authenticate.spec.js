import chai from 'chai';
import httpMocks from 'node-mocks-http';
import events from 'events';
import chaiHttp from 'chai-http';
import server from '../../app';
import authenticate from '../../midddlewares/authenticate';
import sampleUsers from '../../test-utility/helpers/api/helperUsers';

const expect = chai.expect;

const middlewareTestUser = sampleUsers.middlewareTestUser;
const responseEvent = () => httpMocks
.createResponse({ eventEmitter: events.EventEmitter });
chai.use(chaiHttp);

describe('verifyToken', () => {
  let token;
  before((done) => {
    chai.request(server)
      .post('/users')
      .send(middlewareTestUser)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe('verifyToken', () => {
    it('should verify token', (done) => {
      const response = responseEvent();

      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        headers: { 'x-access-token': token },
      });

      const callback = () => {
        expect(request.decoded.data.roleId).to.equal(1);
        done();
      };
      authenticate.verifyToken(request, response, callback);
    });
    it('should catch Incorrect token', (done) => {
      const response = responseEvent();

      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
        headers: { 'x-access-token': `faketoken${token}` },
      });

      const callback = () => {};
      authenticate.verifyToken(request, response, callback);
      response.on('end', () => {
        expect(response._getData().message).to
        .equal('Incorrect token.');
      });
      done();
    });
    it('should catch empty token', (done) => {
      const response = responseEvent();

      const request = httpMocks.createRequest({
        method: 'GET',
        url: '/users',
      });

      const callback = () => {};
      authenticate.verifyToken(request, response, callback);
      response.on('end', () => {
        expect(response._getData().message).to
        .equal('No token provided.');
      });
      done();
    });
  });
});
