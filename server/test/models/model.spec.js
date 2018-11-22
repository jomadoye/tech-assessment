import chai from 'chai';
import model from '../../models/';


process.env.NODE_ENV = 'test';

const should = chai.should();

describe('Create Models', () => {
  it('should have a Role model', () => {
    should.exist(model.Roles);
  });
  it('should have Users Model', () => {
    should.exist(model.Users);
  });
});
