import { Sequelize } from "sequelize/types";

class Follows {
  public follow;

  constructor(sequelize: Sequelize, Sequelize) {
    this.follow = sequelize.define("follows", {});
  }
}

export default Follows;
