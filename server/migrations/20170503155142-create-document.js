module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING,
      },
      body: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ownerRoleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      access: {
        allowNull: false,
        type: Sequelize.ENUM('public', 'private', 'role'),
        defaultValue: 'public',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
        },
      },
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Documents');
  },
};
