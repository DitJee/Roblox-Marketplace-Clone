import ModelHelper from "../helpers/model.helper";
import DB from "../models";

class FriendPreCheck {
  private User;
  private Friend;

  constructor() {
    const db = new DB();
    this.User = db.user.user;
    this.Friend = db.friend.friend;
  }

  public checkIfAddSelf = async (req, res, next): Promise<void> => {
    try {
      const pair = await ModelHelper.getRequestingPair(
        this.User,
        req.body.requester.id,
        req.body.requestee.id
      );

      const result = this.checkIfPairExist(res, pair.requestee, pair.requester);
      if (!result) return;

      if (req.body.requester.id === req.body.requestee.id) {
        res.status(400).send({
          message: "same id bruh!",
        });
        return;
      }

      next();
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
      return;
    }
  };

  public checkIfRequestExist = async (req, res, next): Promise<void> => {
    try {
      const pair = await ModelHelper.getRequestingPair(
        this.User,
        req.body.requester.id,
        req.body.requestee.id
      );

      const result = this.checkIfPairExist(res, pair.requestee, pair.requester);
      if (!result) return;

      // get the request from requester using requestee id
      const requestee = pair.requester.getRequestees({
        where: {
          requesteeId: req.body.requestee.id,
        },
      });

      if (requestee) {
        next();
      } else {
        res.status(400).send({
          message: "request does not exist",
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

  private checkIfPairExist = (res, requestee, requester): boolean => {
    if (requestee === null) {
      res.status(400).send({
        message: "requestee does not exist!",
      });
      return false;
    } else if (requester === null) {
      res.status(400).send({
        message: "requester does not exist!",
      });
      return false;
    } else {
      return true;
    }
  };

  public checkIfIsFriend = async (req, res, next): Promise<void> => {
    try {
      const pair = await ModelHelper.getFriendById(
        this.Friend,
        req.body.user.id
      );

      if (pair && pair.friendId === req.body.friend.id) {
        next();
      } else {
        res.status(400).send({
          message: "they are not friends",
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

export default FriendPreCheck;
