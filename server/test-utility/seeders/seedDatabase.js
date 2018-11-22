import models from '../../models';
import roleSeeder from './roleSeeder';
import userSeeder from './userSeeder';

const seeds = () => {
  models.sequelize.sync({ force: true }).then(() => {
    // Table created
    models.Roles.bulkCreate(roleSeeder);
    models.Users.bulkCreate(userSeeder, { individualHooks: true });
  });
};

export default seeds();
