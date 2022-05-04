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
        defaultValue:
          "I am Dit Dejphachon, an aerospace engineering student who has a strong passion for software engineering and game development. I have worked on many projects related to unmanned aircraft system, full stack web development, and game development. I attached my resume which contains my background and experience for your interest. Please contact me at +xx xx-xxx-xxxx or by email Ditdejphachon@gmail.com for more information",
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
