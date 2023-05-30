import fetch from 'node-fetch';

const heating = () => {};

const HONEYWELL_BASE_URL = 'https://api.honeywell.com/v2/devices/schedule/'

const LH_BASE_URL = `http://emea.littlehotelier.com`
const LH_GROUP_CODE = process.env.GROUP_CODE
const LH_FORMAT = `json`

const properties = {
  littlehotelieridforeachproperty: { // copy this for each property
    lh: {
      locationId: '111',
    }
  },
}

const ENDPOINT_GROUP = `${BASE_SITE_URI}/api/v1/property_groups/${GROUP_CODE}/rates${FORMAT}`

const setPropertyHeating = async (property) => {
  const headers = {
    apikey: process.env.HONEYWELL_API_KEY,
    locationId: property.lh.locationId,
    type: 'regular',
  }

  if(!!property.available) {// not sure how you actually set the schedule/what that would look like
    //select schedule for no guests present
  } else {
    //select schedule for guests present
  }

  const propertyData = await fetch(`${HONEYWELL_BASE_URL}/${property.deviceId}`, headers) // set heating
    .then((response) => response.json())

  return
}

const setPropertiesHeating = async (properties) => {
  return Promise.all(properties.map(todo => setPropertyHeating(todo)))
}

const setHeating = async () => {
  const propertyData = await fetch(ENDPOINT_GROUP) // get data for the property group
    .then((response) => response.json())

  console.log(propertyData) // print it to the console for debugging (can be deleted)

  propertyData[0]["rate_plans"].forEach(property => { // for each of the properties
    properties[property.id].availability = property["rate_plan_dates"].available !== 0 // set if it's available
  })

  await setPropertiesHeating(properties)

  return 'DONE'
};

heating.setHeating = setHeating;

export default heating;