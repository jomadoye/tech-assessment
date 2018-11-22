export default (sequelize, DataTypes) => {
  const Document = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'This document title already exist' },
      required: true,
      validate: {
        notEmpty: { args: true, msg: 'This title cannot be empty' },
      },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      required: true,
      validate: {
        notEmpty: { args: true, msg: 'This body cannot be empty' },
      },
    },
    access: {
      type: DataTypes.ENUM('public', 'private', 'role'),
      allowNull: false,
      defaultValue: 'public',
      required: true,
    },
    ownerRoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Document.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'SET NULL',
        });
      },
    },
  });
  return Document;
};
