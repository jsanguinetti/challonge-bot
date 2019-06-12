const { basePath, headers } = require("./config");
const axios = require("axios").default;

const login = (externalId, challongeUsername, tournamentId) => {
  let options = {
    externalId,
    challongeUsername
  };
  if (parseInt(tournamentId)) {
    options.tournamentId = parseInt(tournamentId);
  }

  return axios.post(basePath + "/auth/login", options, { headers });
};
module.exports = {
  login
};
