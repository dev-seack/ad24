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
*/

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
