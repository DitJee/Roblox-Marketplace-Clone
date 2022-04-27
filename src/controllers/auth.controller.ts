import DB from "../models";
import AuthConfig from "../config/auth.config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

class Authentication {
  private User;
  private Role;
  private Op;

  constructor() {
    const db = new DB();

    this.User = db.user.user;
    this.Role = db.role.role;
    this.Op = db.Sequelize.Op;
  }

  public signup = async (req, res) => {
    try {
      // Create a new user
      const user = await this.User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });

      // if the role is input, set user to it
      if (req.body.roles) {
        const roles = await this.Role.findAll({
          where: {
            name: {
              [this.Op.or]: req.body.roles,
            },
          },
        });

        await user.setRoles(roles);
        res.send({ message: "User was registered successfully!" });
      } else {
        // Set to default role
        await user.setRoles([1]);
        res.send({ message: "User was registered successfully!" });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  public signin = async (req, res) => {
    try {
      // find the signed in  user
      let user = await this.User.findOne({
        where: {
          username: req.body.username,
        },
      });

      if (!user) {
        // return if not found
        return res.status(404).send({ message: "User Not found." });
      }

      // check the password
      let bPasswordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!bPasswordIsValid) {
        // return if invalid password
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const secret = new AuthConfig();

      var token = jwt.sign(
        {
          id: user.id,
        },
        secret.secret,
        {
          expiresIn: 86400, // 24 hours
        }
      );

      let authorities = [];
      const roles = await user.getRoles();

      roles.forEach((role) => {
        authorities.push("ROLE_" + role.name.toUpperCase());
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
}

export default Authentication;
