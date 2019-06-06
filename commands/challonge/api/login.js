const { basePath, headers } = require("./config");
const axios = require("axios").default;

const login = (externalId, challongeUsername) =>
  axios.post(
    basePath + "/auth/login",
    { externalId, challongeUsername },
    { headers }
  );

module.exports = {
  login
};
