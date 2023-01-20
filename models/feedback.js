const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// changed every model to singular instead of plural - we had a lot of bugs (mixing "user" and "users", for example).  Keeping it all to no "s" at the end.

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
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    // TODO: I don't think this is necessary because achievement_id already references game_id, but I'll leave it commented until confirmed -Colin
    // game_id: {
    //   type: DataTypes.INTEGER,
    //   // id for the game and also the model name for the games
    //   references: {
    //     model: "ownedGames",
    //     key: "appid",
    //   },
    // },
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
