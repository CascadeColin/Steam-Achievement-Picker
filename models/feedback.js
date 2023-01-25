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
      type: DataTypes.STRING,
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
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "feedback",
  }
);

module.exports = feedback;
