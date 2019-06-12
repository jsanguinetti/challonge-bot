function errorHandler(bot, message, error) {
  let errorMessage = null;
  if (error.isAxiosError) {
    /** @type {import('axios').AxiosError} */
    const axiosError = error;
    const res = axiosError.response;
    if (res && res.data && res.data.message) {
      errorMessage = res.data.message;
    } else {
      errorMessage = error.message;
    }
  } else {
    errorMessage = error.message;
  }
  bot.replyPrivate(message, {
    text: `Tu comando "${message.text}" falló`,
    attachments: [
      {
        text: errorMessage,
        color: "#FF2400",
        title: "Error"
      }
    ]
  });
}

function unknownCommandHandler(bot, message) {
  bot.httpBody({
    text: `No reconozco el comando ${message.text}`
  });
}

function channelNotAllowedHandler(bot, message, allowedChannelName) {
  bot.httpBody({
    text: `El comando \`${message.command} ${
      message.text
    }\` solo se puede usar en ${allowedChannelName}`
  });
}

module.exports = {
  unknownCommandHandler,
  channelNotAllowedHandler,
  errorHandler
};
