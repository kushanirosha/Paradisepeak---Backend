export default function authorizeRoles(...allowedRoles) {
  return function (req, res, next) {
    const role = req.user?.role || req.user?.userRole;

    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Access Denied: You do not have permission" });
    }

    next();
  };
}
