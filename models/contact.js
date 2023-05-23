'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contact.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Name is required' },
        notNull: { msg: 'Name is required' },
        len: [10, 50]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: 'Invalid email format' },
        notEmpty: { msg: 'Email is required' },
        notNull: { msg: 'Email is required' }
      }
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Message is required' },
        notNull: { msg: 'Message is required' },
        len: [50, 250]
      }
    }
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};