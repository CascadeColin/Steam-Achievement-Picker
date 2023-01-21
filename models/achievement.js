const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// changed every model to singular instead of plural - we had a lot of bugs (mixing "user" and "users", for example).  Keeping it all to no "s" at the end.

class achievement extends Model {}

achievement.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    achieved: {
      // unsure if this will actually be handled as a boolean.  Steam API data returns 0 for unachieved and 1 for unachieved.  will research how sequelize will handle that but I know mysql interprets 0=false and 1=true - Colin
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // timestamp of when the achievement was earned
    unlock_time: {
      type: DataTypes.INTEGER,
      // Steam API returns
      allowNull: false,
    },
    game_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "ownedGame",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "achievement",
  }
);

module.exports = achievement;
