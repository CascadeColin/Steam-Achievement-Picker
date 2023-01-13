const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Achievements extends Model {}

Achievements.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      achievement_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      game_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "ownedGames",
          key: "appid",
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "oAchievements",
    }
  );

module.exports = Achievements;