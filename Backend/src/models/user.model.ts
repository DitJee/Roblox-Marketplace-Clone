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
      picture: {
        type: Sequelize.STRING(),
        defaultValue: "https://picsum.photos/id/237/200/300",
      },
      about: {
        type: Sequelize.STRING(1000),
      },
      wearing_hair: {
        type: Sequelize.STRING(),
        defaultValue: "https://picsum.photos/id/238/200/300",
      },
      wearing_face: {
        type: Sequelize.STRING(),
        defaultValue: "https://picsum.photos/id/239/200/300",
      },
      wearing_top: {
        type: Sequelize.STRING(),
        defaultValue: "https://picsum.photos/id/240/200/300",
      },
      wearing_left_arm: {
        type: Sequelize.STRING(),
        defaultValue: "https://picsum.photos/id/241/200/300",
      },
      wearing_right_arm: {
        type: Sequelize.STRING(),
        defaultValue: "https://picsum.photos/id/242/200/300",
      },
      wearing_left_leg: {
        type: Sequelize.STRING(),
        defaultValue: "https://picsum.photos/id/243/200/300",
      },
      wearing_right_leg: {
        type: Sequelize.STRING(),
        defaultValue: "https://picsum.photos/id/244/200/300",
      },
    });
  }
}

export default User;
