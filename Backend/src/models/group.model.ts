import { Sequelize } from "sequelize/types";

class Group {
  public group;

  constructor(sequelize: Sequelize, Sequelize) {
    this.group = sequelize.define("groups", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
      },
    });
  }
}

export default Group;
