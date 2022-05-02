import jwt from "jsonwebtoken";
import AuthConfig from "../config/auth.config";
import DB from "../models";

class AuthJwt {
  private User;
  private Secret: string;

  constructor() {
    const db = new DB();
    this.User = db.user.user;
    const authConfig = new AuthConfig();
    this.Secret = authConfig.secret;
  }

  public verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "No token provided!",
      });
    }

    jwt.verify(token, this.Secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      next();
    });
  };

  public isAdmin = async (req, res, next) => {
    try {
      const user = await this.User.findByPk(req.userId);
      const roles = await user.getRoles();
      roles.forEach((role) => {
        if (role.name === "admin") {
          next();
          return;
        }
      });

      res.status(403).send({
        message: "Require Admin Role!",
      });
      return;
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  public isModerator = async (req, res, next) => {
    try {
      const user = await this.User.findByPk(req.userId);
      const roles = await user.getRoles();

      roles.forEach((role) => {
        if (role.name === "moderator") {
          next();
          return;
        }
      });

      res.status(403).send({
        message: "Require Moderator  Role!",
      });
      return;
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  public isModeratorOrAdmin = async (req, res, next) => {
    try {
      const user = await this.User.findByPk(req.userId);
      const roles = await user.getRoles();

      roles.forEach((role) => {
        if (role.name === "admin") {
          next();
          return;
        }
        if (role.name === "moderator") {
          next();
          return;
        }
      });

      res.status(403).send({
        message: "Require Moderator or Admin Role!",
      });
      return;
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
}

export default AuthJwt;
