import { Sequelize } from "sequelize/types";

class Friends {
  public friend;

  constructor(sequelize: Sequelize, Sequelize) {
    this.friend = sequelize.define("friends", {
      user_id: Sequelize.INTEGER,
      friend_id: Sequelize.INTEGER,
    });
  }
}

export default Friends;
