const { crm } = require("../config.js");
const axios = require("axios");
const base64Img = require("base64-img");

const URLS = {
  ADD_PERSON: crm.BASE_URL + "people.json",
  SEARCH_PERSON: crm.BASE_URL + "contact_details/search.json",
  ADD_COMPANY: crm.BASE_URL + "companies.json",
  SEARCH_COMPANY: crm.BASE_URL + "contact_details/search.json",
  ADD_PROJECT: crm.BASE_URL + "project.json",
  SEARCH_PROJECT: crm.BASE_URL + "project/search.json"
};

const API = "?apikey=" + crm.API_KEY;

/* jshint ignore:start */
class Data {
  constructor(content, attachments, person_id = null, company_id = null) {
    this.person_id = person_id;
    this.company_id = company_id;
    this.content = content;
    this.attachments = attachments;
    this.attachment_url = crm.BASE_URL + "attachments.json" + API;

    // company
    if (this.person_id === null && this.company_id !== null) {
      this.protocol_url =
        crm.BASE_URL + "companies/" + this.company_id + "/protocols.json" + API;
    } else {
      // person
      this.protocol_url =
        crm.BASE_URL + "people/" + this.person_id + "/protocols.json" + API;
    }
  }

  async addProtocol() {
    try {
      const p = {
        content: this.content
      };
      const response = await axios.post(this.protocol_url, p);

      if (response.status === 201) {
        await this.addAttachments(response.data.protocol_object_note.id);

        return response.data;
      }
      return false;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addAttachments(protocol_id) {
    // if attachments are given
    if (this.attachments.length > 0) {
      // for all attachments ...
      for (const [i, file] of this.attachments.entries()) {
        // encode image to base64
        try {
          const encoded_image = base64Img
            .base64Sync(file.path)
            .replace(/^data:image\/[a-z]+;base64,/, "");

          // Outsourcen - attach it to the persons object, which will be generated in index.js
          var attachment_obj = {
            attachment: {
              attachable_id: protocol_id,
              attachable_type: "Protocol",
              attachment_category_name: "Bilder",
              content_type: file.type,
              original_filename: file.name,
              data: encoded_image
            }
          };

          await axios.post(this.attachment_url, attachment_obj);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
}

class Person {
  constructor(fields, files) {
    this.id = null;
  }

  async addPerson(person, files) {
    try {
      if (
        await this.isPersonExisting(person.person.emails_attributes[0].name)
      ) {
        return new Error("Person already exists");
      }

      const response = await axios.post(URLS.ADD_PERSON + API, person);

      if (response.status === 201) {
        this.id = response.data.person.id;
        // create custom response object just for us
        var customResponse = new Array();
        customResponse["Person"] = response.data.person;

        // create attachments ...

        // create new protocol for this person
        const data = new Data(person.person.form_content, files, this.id, null);

        return await data
          .addProtocol()
          .then((p) => {
            customResponse["Protocol"] = p.protocol_object_note;
            return customResponse;
          })
          .catch((e) => {
            throw new Error(e);
          });
      }

      throw new Error("Error adding person");
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
  constructor() {
    this.id = null;
  }

  async addCompany(company, files) {
    try {
      if (
        await this.isCompanyExisting(company.company.emails_attributes[0].name)
      ) {
        return new Error("Company already exists");
      }
      console.log(company);
      const response = await axios.post(URLS.ADD_COMPANY + API, company);

      if (response.status === 201) {
        this.id = response.data.company.id;
        // create custom response object just for us
        var customResponse = new Array();
        customResponse["Company"] = response.data.company;

        // create attachments ...
        // create new protocol for this company
        const data = new Data(
          company.company.form_content,
          files,
          null,
          this.id
        );
        console.log("exists2");
        return await data
          .addProtocol()
          .then((p) => {
            customResponse["Protocol"] = p.protocol_object_note;
            return customResponse;
          })
          .catch((e) => {
            throw new Error(e);
          });
      }
      throw new Error("Error adding company");
    } catch (e) {
      console.log(e);
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
