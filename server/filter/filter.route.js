
'use strict'

let FilterHelper = require('./filter.helper')

function filterRoutes (router) {

  router.post('/getCustomers', function (req, res) {
    let details = req.body;

    FilterHelper.getCustomers(details, function (response) {
      
      if (response.error === true) {
        res.status(400).send(response)
      } else {
        res.status(200).send(response)
      }
    })
  })
};

module.exports = filterRoutes
