import { error } from "console";
import FriendHelper from "../helpers/friend.helper";
import UserHelper from "../helpers/user.helper";
import DB from "../models";

class User {
  private User;
  private Friend;

  constructor() {
    const db = new DB();

    this.User = db.user.user;
    this.Friend = db.friend.friend;
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
        const request = await this.Friend.create({
          user_id: req.body.requester.id,
          friend_id: req.body.requestee.id,
          FriendId: req.body.requestee.id,
        });

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
      const friendInfo = await this.Friend.findAll({
        where: {
          user_id: req.body.user.id,
        },
      });

      if (friendInfo) {
        const friends = [];

        try {
          await Promise.all(
            friendInfo.map(async (info) => {
              try {
                const friend = await this.User.findOne({
                  where: {
                    id: info.friend_id,
                  },
                });

                if (friend) friends.push(friend);
              } catch (err) {
                res.send({
                  message: err.message,
                });
              }
            })
          );

          res.send({
            message: `Successfully get friends using userId ${req.body.user.id}`,
            friends: friends,
          });
        } catch (err) {
          res.send({
            message: err.message,
          });
        }
      } else {
        res.send({
          message: `Cannot get friends using userId ${req.body.user.id}`,
          friends: null,
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  public deleteFriend = async (req, res) => {
    try {
      const result = await this.Friend.destroy({
        where: {
          user_id: req.body.user.id,
          friend_id: req.body.friend.id,
        },
      });

      res.send({
        message: `delete userId ${req.body.friend.id} from userId ${req.body.user.id}`,
        result: result,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
}

export default User;
