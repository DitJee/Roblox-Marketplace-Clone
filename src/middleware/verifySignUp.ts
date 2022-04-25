import DB from "../models";

class SignUp {
  private ROLES: string[];
  private User;
  constructor() {
    const db = new DB();
    this.ROLES = db.ROLES;
    this.User = db.user.user;
  }

  public checkDuplicateUsernameOrEmail = async (
    req,
    res,
    next
  ): Promise<void> => {
    // Username
    const user: string = await this.User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }

    // Email
    const email: string = await this.User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (email) {
      res.status(400).send({
        message: "Failed! Email is already in use!",
      });
      return;
    }

    next();
  };

  public checkRolesExisted = async (req, res, next) => {
    if (req.body.roles) {
      req.body.roles.forEach((role) => {
        if (!this.ROLES.includes(role)) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + role,
          });
          return;
        }
      });
    }
    next();
  };
}

export default SignUp;
