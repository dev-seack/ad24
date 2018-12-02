const { crm } = require("../config.json");
const axios = require("axios");
const imgToBase = require("image-to-base64");

const URLS = {
  ADD_PERSON: crm.BASE_URL + "people.json",
  SEARCH_PERSON: crm.BASE_URL + "contact_details/search.json",
  ADD_COMPANY: crm.BASE_URL + "companies.json",
  SEARCH_COMPANY: crm.BASE_URL + "contact_details/search.json",
  ADD_PROJECT: crm.BASE_URL + "project.json",
  SEARCH_PROJECT: crm.BASE_URL + "project/search.json"
};

const API = "?apikey=" + crm.API_KEY;

// TODO:
/** FOR PERSON AND COMPANY
 * - Create Person/Company
 * - save ID temporarily
 * ------------------------
 * - Create Protocol
 * - save protocol_id temporarily
 * - Create Attachment
 * - get description and images from form
 * - save images as attachments
 * - link attachment to protocol => protocol_id
 * - link protocol to user/company => person_ids/company_ids (Array)
 * - save description from form into content of protocol
 */

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
      for (const [i, value] of this.attachments.entries()) {
        // encode image to base64
        const filename = "test.jpg"; // path to image
        const type = filename.substr(filename.indexOf(".") + 1);
        const encoded_image = await imgToBase(__dirname + "/" + filename)
          .then((image) => image)
          .catch((err) => err);

        // Outsourcen - attach it to the persons object, which will be generated in index.js
        var attachment_obj = {
          attachment: {
            attachable_id: protocol_id,
            attachable_type: "Protocol",
            attachment_category_name: "Bilder",
            content_type: "image/" + type,
            original_filename: "File_" + value,
            data: encoded_image
          }
        };

        try {
          // post attachments
          await axios.post(this.attachment_url, attachment_obj);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
}

class Person {
  constructor() {
    this.id = null;
  }

  async addPerson(person) {
    try {
      // if (
      //   await this.isPersonExisting(person.person.emails_attributes[0].name)
      // ) {
      //   return new Error("Person already exists");
      // }

      const response = await axios.post(URLS.ADD_PERSON + API, person);

      if (response.status === 201) {
        this.id = response.data.person.id;
        // create custom response object just for us
        var customResponse = new Array();
        customResponse["Person"] = response.data.person;

        // create attachments ...

        // create new protocol for this person
        const data = new Data(
          person.person.form_content,
          ["1", "2"],
          this.id,
          null
        );

        return await data
          .addProtocol()
          .then((p) => {
            customResponse["Protocol"] = p.protocol_object_note;
            return customResponse;
          })
          .catch((e) => {
            return e;
          });
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
  constructor() {
    this.id = null;
  }

  async addCompany(company) {
    try {
      if (
        await this.isCompanyExisting(company.company.emails_attributes[0].name)
      ) {
        return new Error("Company already exists");
      }

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
          ["1", "2"],
          null,
          this.id
        );
        return await data
          .addProtocol()
          .then((p) => {
            customResponse["Protocol"] = p.protocol_object_note;
            return customResponse;
          })
          .catch((e) => {
            return e;
          });
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
