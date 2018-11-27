const crm = require("../config.json").crm;
const axios = require("axios");

// TODO:
/*
PERSON, CONTACT_DETAILS, ADDRESS, PROJECTS, COMPANIES AND DEALS
PERSON IS MAINLY JUST AN OBJECT TO SAVE THE ID AND ATTACHMENTS LIKE PROJECT_ID OR CONTACT_ID. THIS MERGED TOGETHER WILL CREATE THE PERSON OR COMPANY IN WHOLE

- Search Person with email: https://auftragsdepot24.centralstationcrm.net/api/contact_details/search.json?apikey={{apikey}}&type=people&name=info@auftragsdepot24.de
- if response is empty, create person, if not, save the inserted information and send it in an email to ad24
- Person: 
  - create/Post 'Person': name, first_name
  - SAVE ID FROM CREATED PERSON
  - create/post contact_details to save phonenumber, email, ...
  - attach Persons ID!!!
    "attachable_type": "Person",
    "attachable_id": 7485489

  - eventaully create Project and/or Deal
*/

const URLS = {
  ADD_PERSON: crm.BASE_URL + "people.json",
  SEARCH_PERSON: crm.BASE_URL + "contact_details/search.json",
  ADD_COMPANY: crm.BASE_URL + "company.json",
  SEARCH_COMPANY: crm.BASE_URL + "company/search.json",
  ADD_PROJECT: crm.BASE_URL + "project.json",
  SEARCH_PROJECT: crm.BASE_URL + "project/search.json"
};

const API = "?apikey=" + crm.API_KEY;
const apikey = crm.API_KEY;

/* jshint ignore:start */
class Person {
  constructor() {}

  async addPerson(person) {
    try {
      if (!this.isPersonExisting(person.email)) {
        return false;
      }
      const response = await axios.post(URLS.ADD_PERSON + API, person);
      if (response.status == 200) {
        return response.data;
      }
      return false;
    } catch (e) {
      throw new Error(e);
    }
  }

  async isPersonExisting(email) {
    try {
      const fetch_url = URLS.SEARCH_PERSON + API + "&email=" + email;
      const newPerson = await axios.get(fetch_url);

      console.log(fetch_url, newPerson.data, newPerson.data > 0);

      return newPerson.data.length > 0;
    } catch (e) {
      throw new Error(e);
    }
  }
}
/* jshint ignore:end */

var Company = {
  addCompany: () => {},

  isCompanyExisting: (email) => {}
};

var Project = {
  addProject: () => {},

  isProjectExisting: (email) => {}
};

module.exports = {
  Person,
  Company,
  Project
};
