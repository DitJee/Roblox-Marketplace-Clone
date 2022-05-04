import { Sequelize } from "sequelize/types";

class FriendRequests {
  public friendRequests;

  constructor(sequelize: Sequelize, Sequelize) {
    this.friendRequests = sequelize.define("friendRequests", {});
  }
}

export default FriendRequests;
