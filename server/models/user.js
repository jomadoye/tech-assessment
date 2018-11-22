import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      validate: {
        notEmpty: { args: true, msg: 'Fullname cannot be empty' },
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'This username already exist' },
      required: true,
      validate: { notEmpty: { args: true, msg: 'Username cannot be empty' } },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'This email already exist' },
      required: true,
      validate: {
        isEmail: true,
        notEmpty: { args: true, msg: 'Email cannot be empty' },
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      validate: {
        notEmpty: { args: true, msg: 'Password cannot be empty' },
      },
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        User.hasMany(models.Documents, {
          foreignKey: 'userId',
          as: 'documents',
          onDelete: 'SET NULL',
        });

        User.belongsTo(models.Roles, {
          foreignKey: 'roleId',
          onDelete: 'SET NULL',
        });
      },
    },
    instanceMethods: {
      checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },

      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
      },
    },

    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },

      beforeUpdate(user) {
        if (user.password) {
          user.hashPassword();
        }
      },
    },
  });
  return User;
};
