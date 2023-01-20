const { Model, DataTypes } = require("sequelize");
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
    comment_body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    achievement_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "achievement",
        key: "id"
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    achievement_id: {
      type: DataTypes.INTEGER,
      references: {
        // id for the achivement and also the model name for the achivements
        model: "achievement",
        key: "id",
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
