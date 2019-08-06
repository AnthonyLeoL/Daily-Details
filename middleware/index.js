var middlewareObj = {}
middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('error', 'log in to complete this action')
  res.redirect('/login')
}
module.exports = middlewareObj
