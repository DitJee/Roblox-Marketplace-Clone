import { Sequelize } from "sequelize/types";

class Friends {
  public friend;

  constructor(sequelize: Sequelize, Sequelize) {
    this.friend = sequelize.define("friends", {});
  }
}

export default Friends;
