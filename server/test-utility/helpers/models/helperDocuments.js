import faker from 'faker';

export default {
  privateDocument: {
    title: faker.lorem.words(),
    body: faker.lorem.sentence(),
    access: 'private',
  },
  publicDocument: {
    title: 'i am unique',
    body: faker.lorem.sentence(),
    access: 'public',
  },
  noTitleDocument: {
    body: faker.lorem.sentence(),
  },
  NoUniqueTitleDocument: {
    title: 'i am unique',
    body: faker.lorem.sentence(),
  },
  invalidDocumentAccess: {
    title: faker.lorem.words(),
    body: faker.lorem.sentence(),
    access: 'wrongAccess',
  },
  emptyTitleDocument: {
    title: '',
    body: faker.lorem.sentence(),
  },
  emptyBodyDocument: {
    title: faker.lorem.words(),
    body: '',
  },
  noBodyDocument: {
    title: faker.lorem.words(),
  },
};
