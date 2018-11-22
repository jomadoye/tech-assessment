export default (sequelize, DataTypes) => {
  const Role = sequelize.define('Roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'This role already exist' },
      validate: {
        notEmpty: { args: true, msg: 'This role title cannot be empty' },
      },
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Role.hasMany(models.Users, {
          foreignKey: 'roleId',
          as: 'users',
          onDelete: 'SET NULL',
        });
      },
    },
  });
  return Role;
};
