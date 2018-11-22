import chai from 'chai';
import model from '../../models';
import helperDocuments from '../../test-utility/helpers/models/helperDocuments';
import helperUsers from '../../test-utility/helpers/api/helperUsers';

process.env.NODE_ENV = 'test';

const should = chai.should();
const Document = model.Documents;
const User = model.Users;
const publicDocument = helperDocuments.publicDocument;
const noTitleDocument = helperDocuments.noTitleDocument;
const NoUniqueTitleDocument = helperDocuments.NoUniqueTitleDocument;
const invalidDocumentAccess = helperDocuments.invalidDocumentAccess;
const emptyTitleDocument = helperDocuments.emptyTitleDocument;
const emptyBodyDocument = helperDocuments.emptyBodyDocument;
const noBodyDocument = helperDocuments.noBodyDocument;
const fakeUser2 = helperUsers.fakeUser2;

describe('Document Model', () => {
  let document;
  let userdata;

  before((done) => {
    User.create(fakeUser2)
      .then((newUser) => {
        userdata = newUser;
        publicDocument.userId = userdata.id;
        done();
      });
  });

  describe('Create Document', () => {
    it('should create new document', (done) => {
      Document.create(publicDocument)
        .then((newDocument) => {
          document = newDocument;
          should.exist(document);
          done();
        });
    });

    it('should ensure created documents have title, body and access', () => {
      document.title.should.eql(publicDocument.title);
      document.body.should.eql(publicDocument.body);
      document.access.should.eql(publicDocument.access);
    });

    it('should create a document with correct userId', () => {
      document.userId.should.eql(userdata.id);
    });

    it('should create a document with published date', () => {
      should.exist(document.createdAt);
    });

    it('should create a document with access set to public', () => {
      document.access.should.eql('public');
    });
  });

  describe('Documents Validation', () => {
    describe('Document title validation', () => {
      it('should require a title field to create a document', (done) => {
        Document.create(noTitleDocument)
          .catch((error) => {
            /notNull Violation: title cannot be null/
            .test(error.message)
              .should.eql(true);
            done();
          });
      });

      it('should require a unique title field to create a document', (done) => {
        Document.create(NoUniqueTitleDocument)
          .catch((error) => {
            /SequelizeUniqueConstraintError/.test(error.name)
              .should.eql(true);
            done();
          });
      });

      it('should require public or private as document access', (done) => {
        Document.create(invalidDocumentAccess)
          .catch((error) => {
            (/SequelizeDatabaseError/.test(error.name))
            .should.eql(true);
            done();
          });
      });

      it('should ensure title can not be empty', (done) => {
        Document.create(emptyTitleDocument)
          .catch(error =>
            (/Validation error: Validation notEmpty failed/
              .test(error.message))
            .should.eql(false),
          );
        done();
      });
    });

    describe('Document body validation', () => {
      it('should require body field to create a document', (done) => {
        Document.create(noBodyDocument)
          .catch((error) => {
            /notNull Violation: body cannot be null/
            .test(error.message)
              .should.eql(true);
            done();
          });
      });

      it('should ensure body can not be empty', () => {
        Document.create(emptyBodyDocument)
          .catch(error =>
            (/Validation error: Validation notEmpty failed/
              .test(error.message))
            .should.eql(false),
          );
      });
    });
  });
});
