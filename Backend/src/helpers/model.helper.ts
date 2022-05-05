class ModelHelper {
  public static getRequestingPair = async (model, requesterId, requesteeId) => {
    try {
      // get both requester and requestee
      const requester = await model.findOne({
        where: {
          id: requesterId,
        },
      });

      // get both requester and requestee
      const requestee = await model.findOne({
        where: {
          id: requesteeId,
        },
      });

      return {
        requester: requester,
        requestee: requestee,
      };
    } catch (err) {
      return {
        requester: null,
        requestee: null,
      };
    }
  };

  public static getFriendById = async (friend, userId) => {
    try {
      // get both requester and requestee
      const _friend = await friend.findOne({
        where: {
          userId: userId,
        },
      });

      return _friend;
    } catch (err) {
      return null;
    }
  };
}

export default ModelHelper;
