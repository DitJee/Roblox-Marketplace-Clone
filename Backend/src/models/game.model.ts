import { Sequelize } from "sequelize/types";

class Game {
  public game;

  constructor(sequelize: Sequelize, Sequelize) {
    this.game = sequelize.define("games", {
      thumbnail: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      likePercentage: {
        type: Sequelize.FLOAT,
      },
      viewCount: {
        type: Sequelize.FLOAT,
      },
    });
  }
}

export default Game;
