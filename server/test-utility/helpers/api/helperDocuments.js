import faker from 'faker';

export default {
  privateDoc: {
    title: 'seed document test',
    body: faker.lorem.sentence(),
    access: 'private',
    userId: 1,
    role: 1,
    ownerRoleId: 3,
  },
  publicDoc: {
    title: 'public seed document test',
    body: faker.lorem.sentence(),
    access: 'public',
    userId: 1,
    role: 1,
    ownerRoleId: 3,
  },
  document1: {
    title: 'public seed document',
    body: faker.lorem.sentence(),
    access: 'public',
    ownerRoleId: 2,
  },

  fakeDocument: {
    title: faker.lorem.word(),
    body: faker.lorem.sentence(),
    access: 'public',
    ownerRoleId: 2,
  },

  fakeDocumentBasicUser: {
    title: faker.lorem.word(),
    body: faker.lorem.sentence(),
    access: 'private',
    ownerRoleId: 2,
  },

  unUniqueTitleDocument: {
    title: 'Fake title document',
    body: faker.lorem.sentence(),
    access: 'public',
    ownerRoleId: 2,
  },
};
