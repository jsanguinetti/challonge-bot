const { basePath, headers } = require("./config");
const axios = require("axios").default;

const list = (externalId, tournamentNumber) => {
  let url = basePath + `/matches?externalId=${externalId}`;
  if (tournamentNumber) {
    url += `&tournamentId=${tournamentNumber}`;
  }
  return axios.get(url, { headers });
};

module.exports = {
  list
};
