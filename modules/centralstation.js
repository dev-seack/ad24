const crm = require("../config.json").crm;
const axios = require("axios");

const URLS = {
  ADD_PERSON: crm.BASE_URL + "people.json",
  SEARCH_PERSON: crm.BASE_URL + "people/search.json",
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
      console.log(e);
    }
  }

  async isPersonExisting(email) {
    try {
      const fetch_url = URLS.SEARCH_PERSON + API + "&email=" + email;
      const newPerson = await axios.get(fetch_url);

      console.log(fetch_url, newPerson.data, newPerson.data > 0);

      return newPerson.data.length > 0;
    } catch (e) {
      console.log(e);
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
