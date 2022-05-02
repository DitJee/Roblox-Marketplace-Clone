import { Sequelize } from "sequelize/types";

class GameCategory {
  public gameCategory;

  constructor(sequelize: Sequelize, Sequelize) {
    this.gameCategory = sequelize.define("gameCategories", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      category: {
        type: Sequelize.STRING,
      },
    });
  }
}

export default GameCategory;
