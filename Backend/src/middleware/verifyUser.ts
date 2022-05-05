import ModelHelper from "../helpers/model.helper";
import DB from "../models";

class UserPreCheck {
  private User;
  constructor() {
    const db = new DB();
    this.User = db.user.user;
  }

  public checkIfUserExist = async (req, res, next): Promise<void> => {
    try {
      const user = await this.User.findOne({
        where: {
          id: req.body.user.id,
        },
      });

      if (user) {
        next();
      } else {
        res.status(400).send({
          message: "user does not exist",
        });
        return;
      }
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
      return;
    }
  };
}

export default UserPreCheck;
