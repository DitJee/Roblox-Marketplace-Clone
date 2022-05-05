import { Sequelize } from "sequelize/types";

class Role {
  public role;

  constructor(sequelize: Sequelize, Sequelize) {
    this.role = sequelize.define("roles", {
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

export default Role;
