const redirects =
  [
    { from: '/company-details', to: '/company' }
  ]
module.exports = function (req, res, next) {
  const host = req.headers.host;
  const fullUrl = req.url;
  var url = `/${req.url.split('/')[1]}`;
  var param = `/${req.url.split('/')[2]}`;
  // var urlParams = null;
  // if (req.url.includes("?")) {
  //   urlParams = '?' + req.url.split('?')[1]
  // }


  const redirect = redirects.find(r => r.from === url)
  if (redirect) {
    var newLocation;
    if (param) {
      newLocation = redirect.to + param;
    } else {
      newLocation = redirect.to;
    }
    res.writeHead(301, {
      Location: newLocation
    });
    res.end()
  } else {
    next()
  }



}
