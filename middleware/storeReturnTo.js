//this stores the returnTo url, as passport.authenticate clears the session and the returnTo url is lost

const storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};

module.exports = storeReturnTo;
