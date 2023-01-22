const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class user extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

user.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 8,
      },
    },
    steam_id: {
      // JS doesn't like numbers larger than 16.  Attempting to bypass treating as a string.
      type: DataTypes.STRING,
      allowNull: false,
      // steam ID are always 17 characters
      validate: {
        len: [17, 17],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newuserData) {
        newuserData.password = await bcrypt.hash(newuserData.password, 10);
        return newuserData;
      },
      async beforeUpdate(updateduserData) {
        updateduserData.password = await bcrypt.hash(
          updateduserData.password,
          10
        );
        return updateduserData;
      },
    },
    sequelize,
    // can use timestamps on feedback and doesn't hurt us to store it
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = user;
