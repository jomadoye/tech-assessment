import chai from 'chai';
import chaiHttp from 'chai-http';
import helperUsers from '../../test-utility/helpers/api/helperUsers';
import helperDocuments from '../../test-utility/helpers/api/helperDocuments';
import server from '../../app';

process.env.NODE_ENV = 'test';

const fakeUserAdmin = helperUsers.fakeUserAdmin;
const document1 = helperDocuments.document1;
const emptyBodyDocument = helperDocuments.emptyBodyDocument;
const emptyTitleDocument = helperDocuments.emptyTitleDocument;
const noBodyDocument = helperDocuments.noBodyDocument;
const noTitleDocument = helperDocuments.noTitleDocument;
const unUniqueTitleDocument = helperDocuments.unUniqueTitleDocument;
const fakeDocument = helperDocuments.fakeDocument;
const fakeDocumentBasicUser = helperDocuments.fakeDocumentBasicUser;
const invalidUserId = helperUsers.invalidUserId;
const basicUser = helperUsers.basicUser;
chai.use(chaiHttp);

describe('Document API', () => {
  let userData;
  let document;
  let document2;
  let basicUserData;
  before((done) => {
    chai.request(server)
      .post('/users')
      .send(fakeUserAdmin)
      .end((err, res) => {
        userData = res.body;
        document1.userId = userData.user.id;
        chai.request(server)
          .post('/users')
          .send(basicUser)
          .end((err, res) => {
            basicUserData = res.body;
            document1.userId = userData.user.id;
          });
        done();
      });
  });

  describe('Create Document', () => {
    it('should create a new document', (done) => {
      chai.request(server)
        .post('/api/documents')
        .set('x-access-token', userData.token)
        .send(document1)
        .end((err, res) => {
          document = res.body;
          res.should.have.status(201);
          res.body.message.should.eql('Document created successfully.');


          done();
        });
    });

    it('should create a new document with valid credentials by admin',
      (done) => {
        chai.request(server)
          .post('/api/documents')
          .set('x-access-token', userData.token)
          .send(fakeDocument)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.message.should.eql('Document created successfully.');

            res.body.document.should.have.property('id');
            res.body.document.should.have.property('userId');
            res.body.document.should.have.property('title');
            res.body.document.should.have.property('body');
            res.body.document.should.have.property('updatedAt');
            res.body.document.should.have.property('createdAt');
            done();
          });
      });

    it(`should create a new private document with valid credentials by basic
     users`, (done) => {
      chai.request(server)
        .post('/api/documents')
        .set('x-access-token', basicUserData.token)
        .send(fakeDocumentBasicUser)
        .end((err, res) => {
          document2 = res.body;
          res.should.have.status(201);
          res.body.message.should.eql('Document created successfully.');

          res.body.document.should.have.property('id');
          res.body.document.should.have.property('userId');
          res.body.document.should.have.property('title');
          res.body.document.should.have.property('body');
          res.body.document.should.have.property('updatedAt');
          res.body.document.should.have.property('createdAt');
          done();
        });
    });

    it('should not create a new document without title', (done) => {
      chai.request(server)
        .post('/api/documents')
        .set('x-access-token', userData.token)
        .send(noTitleDocument)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should
            .eql('An error occured while creating this document.');

          done();
        });
    });

    it('should not create a new document without body', (done) => {
      chai.request(server)
        .post('/api/documents')
        .set('x-access-token', userData.token)
        .send(noBodyDocument)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should
            .eql('An error occured while creating this document.');

          done();
        });
    });

    it('should not create a new document with empty title', (done) => {
      chai.request(server)
        .post('/api/documents')
        .set('x-access-token', userData.token)
        .send(emptyTitleDocument)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should
            .eql('An error occured while creating this document.');

          done();
        });
    });

    it('should not create a new document with empty body', (done) => {
      chai.request(server)
        .post('/api/documents')
        .set('x-access-token', userData.token)
        .send(emptyBodyDocument)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should
            .eql('An error occured while creating this document.');

          done();
        });
    });

    it('should not create a document with unUnique title', (done) => {
      chai.request(server)
        .post('/api/documents')
        .set('x-access-token', userData.token)
        .send(unUniqueTitleDocument)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');

          res.body.message.should
            .eql('An error occured while creating this document.');
          done();
        });
    });
  });

  describe('Search Document by title', () => {
    it('should search for a document by title', (done) => {
      chai.request(server)
        .get(`/api/search/documents/?q=${document.document.title}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('This is your document.');

          done();
        });
    });

    it('should not find doc if title does not exist', (done) => {
      chai.request(server)
        .get('/api/search/documents/?q=notExist')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.body.documents.count.should.eql(0);
          done();
        });
    });
  });

  describe('/GET Documents', () => {
    it('should return error for unauthorized users without tokens', (done) => {
      chai.request(server)
        .get('/api/documents')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.eql('No token provided.');

          done();
        });
    });

    it('should return error for users with invalid tokens', (done) => {
      chai.request(server)
        .get('/api/documents')
        .set('x-access-token', 'notToken')
        .end((err, res) => {
          res.should.have.status(403);
          res.body.message.should.eql('Incorrect token.');

          done();
        });
    });

    it('should get a document by Id', (done) => {
      chai.request(server)
        .get(`/api/documents/${document.document.id}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('This is your document.');

          done();
        });
    });

    it('should not get a non-existent document by Id', (done) => {
      chai.request(server)
        .get(`/api/documents/${invalidUserId}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.eql('Document Not Found');

          done();
        });
    });

    it('should not get a private document by Id if not admin or owner',
      (done) => {
        chai.request(server)
          .get(`/api/documents/${1}`)
          .set('x-access-token', basicUserData.token)
          .end((err, res) => {
            res.should.have.status(403);
            res.body.message.should
              .eql('You dont have permission to view this document');

            done();
          });
      });

    it('should get a private document by Id if owner', (done) => {
      chai.request(server)
        .get(`/api/documents/${5}`)
        .set('x-access-token', basicUserData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('This is your document.');

          done();
        });
    });

    it('should get a private document by Id if admin', (done) => {
      chai.request(server)
        .get(`/api/documents/${1}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('This is your document.');

          done();
        });
    });

    it('should not get a document with non-existient Id', (done) => {
      chai.request(server)
        .get(`/api/documents/${invalidUserId}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.eql('Document Not Found');

          done();
        });
    });

    it('should not get a document with invalid Id', (done) => {
      chai.request(server)
        .get('/api/documents/invalidId')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.eql('Error retrieving document');

          done();
        });
    });

    it('should get a document specific to a user', (done) => {
      chai.request(server)
        .get(`/api/users/${userData.user.id}/documents`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should not get doc if userId to get doc is invalid', (done) => {
      chai.request(server)
        .get('/api/users/jed/documents')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.eql('Error retrieving document');

          done();
        });
    });

    it('should not get doc if userId to get doc does not exist', (done) => {
      chai.request(server)
        .get(`/api/users/${invalidUserId}/documents`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.eql('User not found');

          done();
        });
    });

    it('should list all documents if admin', (done) => {
      chai.request(server)
        .get('/api/documents')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('Document is shown below');

          done();
        });
    });

    it('should list all documents for a specific user', (done) => {
      chai.request(server)
        .get(`/api/users/${userData.user.id}/documents`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('This is the user document(s).');

          done();
        });
    });
  });

  describe('/PUT Document', () => {
    it('should update document title', (done) => {
      chai.request(server)
        .put(`/api/documents/${document.document.id}`)
        .set('x-access-token', userData.token)
        .send({
          title: 'updateTitle',

        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('Document successfuly updated');

          done();
        });
    });

    it('should update document body', (done) => {
      chai.request(server)
        .put(`/api/documents/${document.document.id}`)
        .set('x-access-token', userData.token)
        .send({
          body: 'updateBody',
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('Document successfuly updated');

          done();
        });
    });

    it('should not update document with non-existent Id', (done) => {
      chai.request(server)
        .put(`/api/documents/${invalidUserId}`)
        .set('x-access-token', userData.token)
        .send({
          title: 'updateTitle',
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.eql('Document Not Found');

          done();
        });
    });

    it('should not update document with invalid Id', (done) => {
      chai.request(server)
        .put('/api/documents/jed')
        .set('x-access-token', userData.token)
        .send({
          title: 'updateTitle',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.eql('Error encountered while updating');

          done();
        });
    });
  });

  describe('/DELETE Document', () => {
    it('should delete a document', (done) => {
      chai.request(server)
        .delete(`/api/documents/${document.document.id}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('Document deleted successfully.');

          done();
        });
    });

    it('should not return document if documentId is non-existent', (done) => {
      chai.request(server)
        .delete(`/api/documents/${invalidUserId}`)
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.eql('Document Not Found');

          done();
        });
    });

    it('should return document error if documentId is invalid', (done) => {
      chai.request(server)
        .delete('/api/documents/invalidDocumentId')
        .set('x-access-token', userData.token)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.eql('Error encountered while deleting user');
          done();
        });
    });

    it('should not delete document if not Admin or owner', (done) => {
      chai.request(server)
        .delete(`/api/documents/${1}`)
        .set('x-access-token', basicUserData.token)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.message.should.eql('unauthorized to perform this request');
          done();
        });
    });

    it('should delete document if owner', (done) => {
      chai.request(server)
        .delete(`/api/documents/${document2.document.id}`)
        .set('x-access-token', basicUserData.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.eql('Document deleted successfully.');
          done();
        });
    });
  });
});
