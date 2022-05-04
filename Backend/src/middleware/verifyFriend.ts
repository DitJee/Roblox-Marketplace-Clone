import FriendHelper from "../helpers/friend.helper";
import DB from "../models";

class Friend {
  private User;
  constructor() {
    const db = new DB();
    this.User = db.user.user;
  }

  public checkIfAddSelf = async (req, res, next): Promise<void> => {
    const pair = await FriendHelper.getRequestingPair(
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
  };

  public checkIfRequestExist = async (req, res, next): Promise<void> => {
    const pair = await FriendHelper.getRequestingPair(
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
}

export default Friend;
