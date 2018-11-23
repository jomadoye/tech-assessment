import faker from 'faker';

export default [{
  fullname: faker.name.findName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  roleId: 2,
}, {
  fullname: faker.name.findName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  roleId: 2,
}, {
  fullname: faker.name.findName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  roleId: 2,
}, {
  fullname: faker.name.findName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  roleId: 3,
}, {
  fullname: faker.name.findName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  roleId: 2,
}, {
  fullname: faker.name.findName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  roleId: 3,
}, {
  username: 'john doe',
  fullname: 'jonathan doe',
  email: faker.internet.email(),
  password: 'password',
  roleId: 3,
},
{
  username: 'dede',
  fullname: 'dede',
  email: faker.internet.email(),
  password: 'password',
  roleId: 1,
},
];
