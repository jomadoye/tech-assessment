import chai from 'chai';
import model from '../../models/';


process.env.NODE_ENV = 'test';

const should = chai.should();

describe('Create Models', () => {
  it('should have a role Model ;-) no pun intended', () => {
    should.exist(model.Roles);
  });
  it('should have Users Model', () => {
    should.exist(model.Users);
  });
  it('should have Documents Model', () => {
    should.exist(model.Documents);
  });
});
