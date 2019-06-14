const { basePath, headers } = require("./config");
const axios = require("axios").default;

const current = () => {
  let url = basePath + `/ranking/current`;
  return axios.get(url, { headers });
};
const currentForMe = externalId => {
  let url = basePath + `/ranking/current/me?externalId=${externalId}`;
  return axios.get(url, { headers });
};
const historyForMe = externalId => {
  let url = basePath + `/ranking/history/me?externalId=${externalId}`;
  return axios.get(url, { headers });
};

module.exports = {
  current,
  currentForMe,
  historyForMe
};
