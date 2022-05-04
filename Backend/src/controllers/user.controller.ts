import { error } from "console";
import FriendHelper from "../helpers/friend.helper";
import DB from "../models";

class User {
  private User;

  constructor() {
    const db = new DB();

    this.User = db.user.user;
  }

  public allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };

  public userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };

  public adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };

  public moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  public addFriend = async (req, res) => {
    try {
      const pair = await FriendHelper.getRequestingPair(
        this.User,
        req.body.requester.id,
        req.body.requestee.id
      );

      if (pair.requestee === null || pair.requester === null) throw new error();

      // set new association
      const request = await pair.requester.setRequestees(req.body.requestee.id);

      res.send({
        message: "User was registered successfully!",
        request: request,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  public handleFriendRequest = async (req, res) => {
    try {
      const pair = await FriendHelper.getRequestingPair(
        this.User,
        req.body.requester.id,
        req.body.requestee.id
      );

      // delete friend request regardless of user choices
      const bIsAccept = req.body.operation.bIsAccept;

      if (bIsAccept) {
        // accept friend request

        // set new friend
        const request = await pair.requester.setFriends(req.body.requestee.id);

        res.send({
          message: "Friend request successfully accepted!",
          request: request,
        });
      } else {
        // decline friend request
        res.send({
          message: "Friend request successfully declined!",
          request: null,
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  public getAllFriends = async (req, res) => {
    try {
    } catch (err) {}
  };
}

export default User;
