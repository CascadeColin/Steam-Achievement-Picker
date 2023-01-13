const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class ownedGames extends Model {}

User.init(
    {
      appid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      gamename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // allows us to display games on main page based on most recently played games.  time is in unix timestamp.  will decide with nathan/marie how/if to use this but might as well store it for now
      last_played: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "ownedGames",
    }
  );

module.exports = ownedGames;