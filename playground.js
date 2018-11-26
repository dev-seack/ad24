const axios = require("axios");

const url =
  "https://auftragsdepot24.centralstationcrm.net/api/people.json?apikey=vjt5m7gmfnl31d0c7m0vko5imx8pwl"; // API KEY in config
const data = {
  name: "Seack",
  first_name: "Marius"
};

axios
  .post(url, data)
  .then((res) => {
    console.log(`status: ${res.status}`);
    console.log(res.data.person);
  })
  .catch((error) => {
    console.error(error);
  });
