import DbConfig from "../config/db.config";
import { OperatorsAliases, Options, Sequelize } from "sequelize";
import User from "./user.model";
import Role from "./role.model";
import Game from "./game.model";
import GameCategory from "./gameCategory.model";
import Group from "./group.model";
import Friends from "./friend.model";
import FriendRequests from "./friendRequest.model";
import Follows from "./follow.model";

const dbConfig = new DbConfig();

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  pool: dbConfig.POOL,
});

class DB {
  public Sequelize;
  public sequelize: Sequelize;
  public user;
  public role;
  public ROLES: string[];
  public game;
  public gameCategory;
  public group;
  public friend;
  public friendRequests;
  public follow;

  constructor() {
    this.Sequelize = Sequelize;
    this.sequelize = sequelize;
    this.user = new User(this.sequelize, this.Sequelize);
    this.role = new Role(this.sequelize, this.Sequelize);
    this.game = new Game(this.sequelize, this.Sequelize);
    this.gameCategory = new GameCategory(this.sequelize, this.Sequelize);
    this.group = new Group(this.sequelize, this.Sequelize);
    this.friend = new Friends(this.sequelize, this.Sequelize);
    this.friendRequests = new FriendRequests(this.sequelize, this.Sequelize);
    this.follow = new Follows(this.sequelize, this.Sequelize);

    this.role.role.belongsToMany(this.user.user, {
      through: "user_roles",
      foreignKey: "roleId",
      otherKey: "userId",
    });

    this.user.user.belongsToMany(this.role.role, {
      through: "user_roles",
      foreignKey: "userId",
      otherKey: "roleId",
    });

    this.ROLES = ["user", "admin", "moderator"];

    this.user.user.belongsToMany(this.group.group, {
      as: "Subscriptions",
      through: "user_groups",
      foreignKey: "userId",
    });

    this.user.user.belongsToMany(this.user.user, {
      as: "Requestees",
      through: this.friendRequests.friendRequests,
      foreignKey: "requesterId",
      onDelete: "CASCADE",
    });
    this.user.user.belongsToMany(this.user.user, {
      as: "Requesters",
      through: this.friendRequests.friendRequests,
      foreignKey: "requesteeId",
      onDelete: "CASCADE",
    });

    this.user.user.belongsToMany(this.user.user, {
      as: "friend",
      through: this.friend.friend,
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    this.user.user.belongsToMany(this.user.user, {
      as: "follower",
      through: this.follow.follow,
      foreignKey: "followedId",
      onDelete: "CASCADE",
    });

    this.game.game.belongsToMany(this.gameCategory.gameCategory, {
      through: "game_categories",
      foreignKey: "gameId",
      otherKey: "gameCategoryId",
    });

    this.gameCategory.gameCategory.belongsToMany(this.game.game, {
      through: "game_categories",
      foreignKey: "gameCategoryId",
      otherKey: "gameId",
    });

    //TEAM
    this.group.group.belongsToMany(this.user.user, {
      as: "Members",
      through: "user_groups",
      foreignKey: this.group.group.id,
    });
  }
}

export default DB;
