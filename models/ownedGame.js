const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class ownedGame extends Model {}

ownedGame.init(
    {
      appid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // URL that lets front-end render a logo of the game in the templates
      img_icon_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        }
      }
      // TODO: (remove these comments on deployment if we stick to random generation)
      // allows us to display games on main page based on most recently played games.  time is in unix timestamp.  will decide with nathan/marie how/if to use this but might as well store it for now
      // last_played: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // Colin: add playtime_forever, playtime_2weeks, rtime_last_played IF front end needs it to limit games rendered in view (see Miro for usage description)
      
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "ownedGame",
    }
  );

module.exports = ownedGame;