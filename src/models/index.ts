import DbConfig from "../config/db.config";
import { OperatorsAliases, Options, Sequelize } from "sequelize";
import User from "./user.model";
import Role from "./role.model";

const dbConfog = new DbConfig();

const sequelize = new Sequelize(dbConfog.DB, dbConfog.USER, dbConfog.PASSWORD, {
  host: dbConfog.HOST,
  dialect: dbConfog.DIALECT,
  pool: dbConfog.POOL,
});

class DB {
  public Sequelize;
  public sequelize: Sequelize;
  public user;
  public role;
  public ROLES: string[];

  constructor() {
    this.Sequelize = Sequelize;
    this.sequelize = sequelize;
    this.user = new User(this.sequelize, this.Sequelize);
    this.role = new Role(this.sequelize, this.Sequelize);

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
  }
}

export default DB;
