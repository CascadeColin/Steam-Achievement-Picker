const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class feedback extends Model {}

feedback.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
    },
    game_id: {
      type: DataTypes.INTEGER,
      // id for the game and also the model name for the games
      references: {
        model: "",
        key: "",
      },
    },
    achievment_id: {
      type: DataTypes.INTEGER,
      references: {
        // id for the achivement and also the model name for the achivements
        model: "",
        key: "",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "feedback",
  }
);

module.exports = feedback;
