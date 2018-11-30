const crm = require("/config.json").crm;
const axios = require("axios");

const URLS = {
  ADD_PERSON: crm.BASE_URL + "people.json",
  SEARCH_PERSON: crm.BASE_URL + "contact_details/search.json",
  ADD_COMPANY: crm.BASE_URL + "companies.json",
  SEARCH_COMPANY: crm.BASE_URL + "contact_details/search.json",
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
      if (
        await this.isPersonExisting(person.person.emails_attributes[0].name)
      ) {
        return false;
      }

      const response = await axios.post(URLS.ADD_PERSON + API, person);
      if (response.status == 201) {
        return response.data;
      }
      return false;
    } catch (e) {
      throw new Error(e);
    }
  }

  async isPersonExisting(email) {
    try {
      const fetch_url = URLS.SEARCH_PERSON + API + "&type=people&name=" + email;
      const newPerson = await axios.get(fetch_url);

      return newPerson.data.length > 0;
    } catch (e) {
      throw new Error(e);
    }
  }
}

class Company {
  constructor() {}

  async addCompany(company) {
    try {
      if (
        await this.isCompanyExisting(company.company.emails_attributes[0].name)
      ) {
        return false;
      }

      const response = await axios.post(URLS.ADD_COMPANY + API, company);

      if (response.status == 201) {
        return response.data;
      }
      return false;
    } catch (e) {
      throw new Error(e);
    }
  }

  async isCompanyExisting(email) {
    try {
      const fetch_url =
        URLS.SEARCH_COMPANY + API + "&type=companies&name=" + email;
      const newCompany = await axios.get(fetch_url);
      return newCompany.data.filter((item) => item.company).length > 0;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = {
  Person,
  Company
};

/* jshint ignore:end */
