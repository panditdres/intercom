'use strict'

const fs = require('fs-extra')
const math = require('mathjs')
const _ = require('lodash')

const office = {latitude: 53.339428, longitude: -6.257664}
const earthRadius = 6371

// Retrieve the customers.json file and parses the data
const rawData = fs.readFileSync(__dirname + '/customers.json')
const customers = JSON.parse(rawData)

// Initialise global variables
let customersRads
let officeRads
let distanceArr
let result

init()

function init () {
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

  distanceCalculation()
}

function distanceCalculation () {
  distanceArr = customersRads.map(el => {
    return {
      user_id: el.user_id,
      name: el.name,
      distance: earthRadius * distanceFormula(el.latitude, el.longitude, officeRads.latitude, officeRads.longitude)
    }
  })

  displayResult()
}

function displayResult () {
  result = distanceArr.filter(el => {
    return el.distance < 100
  }).sort(function (a, b) { return a.user_id - b.user_id })

  console.log(result)
}

function convertRadians (degrees) {
  return degrees * Math.PI / 180
}

function distanceFormula (custLatitude, custLongitude, officeLatitude, officeLongitude) {
  return math.acos(math.sin(custLatitude) * math.sin(officeLatitude) + math.cos(custLatitude) * math.cos(officeLatitude) * math.cos(officeLongitude - custLongitude))
}
