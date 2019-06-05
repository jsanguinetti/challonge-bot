const { basePath, headers } = require("./config");
const axios = require("axios").default;

const list = externalId =>
  axios.get(basePath + `/matches?externalId=${externalId}`, { headers });

module.exports = {
  list
};
