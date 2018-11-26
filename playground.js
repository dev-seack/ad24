const axios = require("axios");

const url =
  "https://auftragsdepot24.centralstationcrm.net/api/people/search.json?email=bau-blitz-service@gmx.de&apikey=vjt5m7gmfnl31d0c7m0vko5imx8pwl"; // API KEY in config
const data = {
  name: "Seack",
  first_name: "Marius"
};

// axios
//   .post(url, data)
//   .then((res) => {
//     console.log(`status: ${res.status}`);
//     console.log(res.data.person);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

axios
  .get(url)
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
