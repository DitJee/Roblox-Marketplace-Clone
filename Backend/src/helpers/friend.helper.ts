class FriendHelper {
  public static getRequestingPair = async (user, requesterId, requesteeId) => {
    try {
      // get both requester and requestee
      const requester = await user.findOne({
        where: {
          id: requesterId,
        },
      });

      // get both requester and requestee
      const requestee = await user.findOne({
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
}

export default FriendHelper;
