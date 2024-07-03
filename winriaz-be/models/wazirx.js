const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnect");

const data = sequelize.define(
  "wazirx",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    buy: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sell: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    volume: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    base_unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "wazirx",
    timestamps: true,
  }
);

data.sync({ force: false });

module.exports = data;
