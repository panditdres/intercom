'use strict'

const fs = require('fs-extra')
const math = require('mathjs')
const _ = require('lodash')

module.exports = {
  getCustomers: getCustomers
}

const office = {latitude: 53.339428, longitude: -6.257664}
const earthRadius = 6371

// Retrieve the customers.json file and parses the data
const rawData = fs.readFileSync('server/customers.json')
const customers = JSON.parse(rawData)

function getCustomers (details, callback) {
  // Initialise variables
  let customersRads
  let officeRads
  let distanceArr
  let result
  console.log(details, 'details!!!!')
  officeRads = {
    latitude: convertRadians(office.latitude),
    longitude: convertRadians(office.longitude)
  }

  customersRads = customers.map(el => {
    return {
      user_id: el.user_id,
      name: el.name,
      latitude: convertRadians(el.latitude),
      longitude: convertRadians(el.longitude)
    }
  })

  distanceArr = customersRads.map(el => {
    return {
      user_id: el.user_id,
      name: el.name,
      distance: (earthRadius * distanceFormula(el.latitude, el.longitude, officeRads.latitude, officeRads.longitude)).toFixed(2)
    }
  })

  result = distanceArr.filter(el => {
    return el.distance < details.distance
  }).sort(function (a, b) { return a.user_id - b.user_id })

  callback({ error: false, message: 'Customer retrieved', data: result })
  
}

function convertRadians (degrees) {
  return degrees * Math.PI / 180
}

function distanceFormula (custLatitude, custLongitude, officeLatitude, officeLongitude) {
  return math.acos(math.sin(custLatitude) * math.sin(officeLatitude) + math.cos(custLatitude) * math.cos(officeLatitude) * math.cos(officeLongitude - custLongitude))
}
