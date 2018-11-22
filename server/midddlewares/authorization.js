export default {

  isOwner(req, res, next) {
    const loggedInUserId = req.decoded.data.id;
    const loggedInUserRoleId = req.decoded.data.roleId;
    const userId = req.params.userId;
    // Admin has all access
    if (loggedInUserRoleId === 1) {
      return next();
    } else if (loggedInUserId === parseInt(userId, 10)) {
      return next();
    }
    return res.status(401)
      .json({
        message: 'unauthorized to perform this request',
      });
  },
};
