import { Sequelize } from "sequelize/types";

class User {
  public user;

  constructor(sequelize: Sequelize, Sequelize) {
    this.user = sequelize.define("users", {
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
    });
  }
}

export default User;
