const { basePath, headers } = require("./config");
const axios = require("axios").default;

const list = () => axios.get(basePath + "/tournaments", { headers });

module.exports = {
  list
};
