import { error } from "console";
import ModelHelper from "../helpers/model.helper";
import DB from "../models";

class User {
  private User;
  private Friend;
  private FriendRequests;
  private Follow;

  constructor() {
    const db = new DB();

    this.User = db.user.user;
    this.Friend = db.friend.friend;
    this.FriendRequests = db.friendRequests.friendRequests;
    this.Follow = db.follow.follow;
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

  public updateUserInfo = async (req, res) => {
    try {
      const result = await this.User.update(req.body.user, {
        where: { id: req.body.user.id },
      });

      res.send({
        message: "User info was successfully updated!",
        result: result,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  public addFriend = async (req, res) => {
    try {
      const pair = await ModelHelper.getRequestingPair(
        this.User,
        req.body.requester.id,
        req.body.requestee.id
      );

      if (pair.requestee === null || pair.requester === null) throw new error();

      // set new association
      const request = await pair.requester.setRequestees(req.body.requestee.id);

      res.send({
        message: "User was registered successfully!",
        result: request,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  public handleFriendRequest = async (req, res) => {
    try {
      const pair = await ModelHelper.getRequestingPair(
        this.User,
        req.body.requester.id,
        req.body.requestee.id
      );

      // delete friend request regardless of user choices
      this.FriendRequests.destroy({
        where: {
          requesterId: req.body.requester.id,
          requesteeId: req.body.requestee.id,
        },
      });

      const bIsAccept = req.body.operation.bIsAccept;

      if (bIsAccept) {
        // accept friend request

        // set new friend
        const request = await this.Friend.create({
          userId: req.body.requester.id,
          friendId: req.body.requestee.id,
        });

        res.send({
          message: "Friend request successfully accepted!",
          result: request,
        });
      } else {
        // decline friend request
        res.send({
          message: "Friend request successfully declined!",
          result: null,
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
          userId: req.body.user.id,
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
                    id: info.friendId,
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
          userId: req.body.user.id,
          friendId: req.body.friend.id,
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

  public followUser = async (req, res) => {
    try {
      const request = await this.Follow.create({
        followerId: req.body.requester.id,
        followedId: req.body.requestee.id,
      });

      res.send({
        message: "Following was successful!",
        result: request,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  public unFollowUser = async (req, res) => {
    try {
      const request = await this.Follow.destroy({
        where: {
          followerId: req.body.requester.id,
          followedId: req.body.requestee.id,
        },
      });

      res.send({
        message: "Unfollowing was successful!",
        result: request,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

  public getFollower = async (req, res) => {
    try {
      const followers = await this.Follow.findAll({
        where: {
          followedId: req.body.user.id,
        },
      });

      const _followers = [];

      await Promise.all(
        followers.map(async (follower) => {
          try {
            const followerInfo = await this.User.findOne({
              where: {
                id: follower.followerId,
              },
            });
            _followers.push(followerInfo);
          } catch (error) {
            _followers.push(null);
          }
        })
      );

      res.send({
        message: `Succesfully get the followers of user ${req.body.user.id}`,
        result: _followers,
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
}

export default User;
