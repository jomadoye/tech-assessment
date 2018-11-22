import chai from 'chai';
import model from '../../models';
import helperRoles from '../../test-utility/helpers/models/helperRoles';

process.env.NODE_ENV = 'test';

const should = chai.should();
const fakeRole = helperRoles.fakeRole;
const Role = model.Roles;

describe('Role Model', () => {
  let role;

  describe('Create Role', () => {
    it('should create new role', (done) => {
      Role.create(fakeRole)
        .then((createdRole) => {
          role = createdRole;
          should.exist(role);
          done();
        });
    });

    it('should ensure role has Id and title', () => {
      should.exist(role.title);
      should.exist(role.id);
    });
  });

  describe('Role Validation', () => {
    it('should requires title field to create a role', (done) => {
      Role.create()
        .catch((error) => {
          (/notNull Violation/.test(error.message))
          .should.eql(true);
          done();
        });
    });
    it('ensures a role can only be created once(unique)', (done) => {
      Role.create(fakeRole)
        .catch((error) => {
          (/SequelizeUniqueConstraintError/.test(error.name))
          .should.eql(true);
          done();
        });
    });
  });
});
