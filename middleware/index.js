var middlewareObj = {}
middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  req.flash('error', 'log in to complete this action')
  res.redirect('/login')
}
middlewareObj.constraintError = function (str, length) {
  if (str.length < length) {
    return true
  }
  return false
}

middlewareObj.sampleData = [
  {
    title: 'Hover to show the complete button!',
    description: 'you got more info!',
    priority: 'Would be Nice to Do'
  },
  {
    title: 'click the green check to mark as done!',
    description: 'you got more info!',
    priority: 'Must do'
  },
  {
    title: 'Click the this title (or around it) to get more info',
    description:
      'Hit back to go back or hit edit to make changes to this item!',
    priority: 'Should do'
  },
  {
    title: "Delete by clicking the trash icon (This can't be undone!)",
    description: 'You can also delete from here!',
    priority: 'Must do'
  },
  {
    title:
      'Type in the quick add bar and then hit "Add" or press enter to make a to-do item',
    description: 'You can always edit it later',
    priority: 'Quick Adds default to "Must Do" priority level'
  },
  {
    title: 'Or, press the white cross to make a deatailed item!',
    description: 'You can always edit it later',
    priority: 'Quick Adds default to "Must Do" priority level'
  }
]
module.exports = middlewareObj
