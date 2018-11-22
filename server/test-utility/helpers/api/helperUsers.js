import faker from 'faker';

export default {
  adminUser: {
    fullname: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1,
  },

  administrator: {
    fullname: faker.name.findName(),
    username: faker.internet.userName(),
    email: 'administrator@gmail.com',
    password: 'admin',
    roleId: 1,
  },

  fakeUser: {
    fullname: faker.name.findName(),
    username: faker.internet.userName(),
    query: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },

  fakeUser1: {
    fullname: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },

  fakeUser2: {
    fullname: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },

  fakeUser3: {
    fullname: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },

  fakeUser4: {
    fullname: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  },

  fakeUserAdmin: {
    fullname: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1,
  },

  fakeUserAdminForRoles: {
    fullname: faker.name.findName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: 1,
  },

  newUser: {
    fullname: 'jerry anthony',
    username: 'jerry',
    email: 'jerry@andela.com',
    password: 'password',
    roleId: 1,
  },

  middlewareTestUser: {
    fullname: 'jed anthony',
    username: 'jerry1234',
    email: 'jerry1234@andela.com',
    password: 'password',
    roleId: 1,
  },

  newUserAdmin: {
    fullname: 'Administrator jed',
    username: 'adminJed',
    email: 'adminJed@andela.com',
    password: 'adminJed',
    roleId: 1,
  },

  noUsername: {
    fullname: faker.name.findName(),
    email: 'jed@andela.com',
    password: 'jedidiah',
  },

  noFullname: {
    username: 'adminJed',
    email: 'jed@andela.com',
    password: 'jedidiah',
  },

  noEmail: {
    fullname: faker.name.findName(),
    username: 'jed',
    password: 'jedidiah',
  },

  noPassword: {
    fullname: faker.name.findName(),
    email: 'jed@andela.com',
    username: 'jed',
  },

  unUniqueUsername: {
    fullname: faker.name.findName(),
    email: 'jerry@andelab.com',
    username: 'jerry',
    password: 'password',
  },

  badEmail: {
    fullname: faker.name.findName(),
    email: 'badEmail',
    username: 'jerry',
    password: 'password',
  },

  basicUser: {
    fullname: faker.name.findName(),
    email: 'basicUser@gmail.com',
    username: 'basicUser',
    password: 'basicUser',
  },

  emptyEmail: {
    fullname: faker.name.findName(),
    email: '',
    username: 'jerry',
    password: 'password',
  },

  emptyPassword: {
    fullname: faker.name.findName(),
    email: 'jerry@andelab.com',
    username: 'jerry',
    password: '',
  },

  emptyUsername: {
    fullname: faker.name.findName(),
    email: 'jerry@andelab.com',
    username: '',
    password: 'jedidiah',
  },

  emptyFullname: {
    email: 'jerry@andelab.com',
    username: 'jed',
    password: 'jedidiah',
    fullname: '',
  },

  unUniqueUsername1: {
    fullname: faker.name.findName(),
    email: 'jerry@andelab.com',
    username: 'john doe',
    password: 'password',
  },

  unUniqueEmail: {
    fullname: faker.name.findName(),
    email: 'jerry@andela.com',
    username: 'jerry1',
    password: 'password',
  },

  updateUsername: {
    username: 'Omadoye Jedidiah',
  },

  updateEmail: {
    email: 'Omadoyejed@gmail.com',
  },

  updateFullname: {
    fullname: 'Omadoye Jedidiah towu',
  },

  updateUsername1: {
    username: 'Omadoye dede',
  },

  invalidUserId: '9999',
  invalidToken: 'abc.efgh.hijk.lmonpq',
};
