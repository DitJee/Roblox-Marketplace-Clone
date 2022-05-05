import { Sequelize } from "sequelize/types";

class Creation {
  public creation;

  constructor(sequelize: Sequelize, Sequelize) {
    this.creation = sequelize.define("creations", {
      creationId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      thumbnail: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.INTEGER,
      },
      visit: {
        type: Sequelize.INTEGER,
      },
      like: {
        type: Sequelize.INTEGER,
      },
    });
  }
}

export default Creation;
