import DB from "../models";

class AddFriend {
  private User;
  constructor() {
    const db = new DB();
    this.User = db.user.user;
  }

  public checkIfAddSelf = async (req, res, next): Promise<void> => {
    // get IDs
    const requesterId = req.body.requester.id;
    const requesteeId = req.body.requestee.id;

    // requester and requestee
    const requester = await this.User.findOne({
      where: {
        id: requesterId,
      },
    });

    if (requester == undefined) {
      res.status(400).send({
        message: "Failed! The requester does not exist!",
      });
      return;
    }

    const requestee = await this.User.findOne({
      where: {
        id: requesteeId,
      },
    });

    if (requestee == undefined) {
      res.status(400).send({
        message: "Failed! The requestee does not exist!",
      });
      return;
    }

    if (requesterId == requesteeId) {
      res.status(400).send({
        message: "cannot send friend request to yourself, dumbass!!!",
      });
      return;
    }

    next();
  };
}

export default AddFriend;
