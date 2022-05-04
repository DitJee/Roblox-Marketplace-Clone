import FriendHelper from "../helpers/friend.helper";
import UserHelper from "../helpers/user.helper";
import DB from "../models";

class UserPreCheck {
  private User;
  constructor() {
    const db = new DB();
    this.User = db.user.user;
  }

  public checkIfUserExist = async (req, res, next): Promise<void> => {
    try {
      const user = await UserHelper.getUserById(this.User, req.body.user.id);

      if (user) {
        next();
      } else {
        res.status(400).send({
          message: "same id bruh!",
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
