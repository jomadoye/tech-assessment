import chai from 'chai';
import httpMocks from 'node-mocks-http';
import events from 'events';
import chaiHttp from 'chai-http';
import authorization from '../../midddlewares/authorization';

const expect = chai.expect;
const responseEvent = () => httpMocks
.createResponse({ eventEmitter: events.EventEmitter });
chai.use(chaiHttp);

describe('isAdmin', () => {
  it('should grant access if Admin', (done) => {
    const response = responseEvent();

    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/users',
    });
    request.decoded = { data: { roleId: 1 } };

    const callback = () => {
      expect(request.decoded.data.roleId).to.equal(1);
      done();
    };
    authorization.isAdmin(request, response, callback);
  });

  it('should not grant access if not Admin', (done) => {
    const response = responseEvent();

    const request = httpMocks.createRequest({
      method: 'GET',
      url: '/users',
    });
    request.decoded = { data: { roleId: 2 } };

    const callback = () => {};
    authorization.isAdmin(request, response, callback);
    response.on('end', () => {
      expect(response._getData().message).to.equal('Admin access is required');
      done();
    });
  });
});

describe('isOwner', () => {
  it('should allow Admin edit all item', (done) => {
    const response = responseEvent();

    const request = httpMocks.createRequest({
      method: 'PUT',
      url: 'api/documents/10',
    });
    request.decoded = { data: { roleId: 1, id: 20 } };
    request.params = { documentId: 10 };

    const callback = () => {
      expect(request.decoded.data.roleId).to.equal(1);
      done();
    };
    authorization.isOwner(request, response, callback);
  });

  it('should not allow non-admins only edit other users items', (done) => {
    const response = responseEvent();

    const request = httpMocks.createRequest({
      method: 'PATCH',
      url: 'api/documents/10',
    });
    request.decoded = { data: { roleId: 3, id: 20 } };
    request.params = { documentId: 10 };

    const callback = () => {};
    authorization.isOwner(request, response, callback);
    response.on('end', () => {
      expect(response._getData().message).to
        .equal('unauthorized to perform this request');
    });
    done();
  });

  it('should allow non-Admin edit their item', (done) => {
    const response = responseEvent();

    const request = httpMocks.createRequest({
      method: 'PUT',
      url: 'api/documents/10',
    });
    request.decoded = { data: { roleId: 3, id: 1 } };
    request.params = { documentId: 10 };

    const callback = () => {
      expect(request.decoded.data.id).to.equal(1);
      done();
    };
    authorization.isOwner(request, response, callback);
  });
});
