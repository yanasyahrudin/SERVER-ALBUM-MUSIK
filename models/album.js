'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Album.belongsTo(models.Genre, { foreignKey: 'genreId' })
      Album.belongsToMany(models.User, {
        through: models.Favorite
      })
      Album.hasMany(models.Favorite)
    }
  }
  Album.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};