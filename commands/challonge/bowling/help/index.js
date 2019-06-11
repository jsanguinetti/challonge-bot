let attachments = [
  {
    title: "Para molestar a alguien que perdió con su último partido",
    color: "#2FA44F",
    text:
      "Mencioná al que quieras usando `/challonge_bowling comiste @someone`, ojo... después hay que aguantar.",
    mrkdwn_in: ["text"]
  }
];

module.exports = errorHandler => async bot => {
  try {
    bot.httpBody({
      text: `
        Además de dar información, también sirvo para dar palo :poop:
        \`\`\`
          Challonge Bot está en fase beta. Algunas funcionalidades tienen errores y falta mucho más por desarrollar.
          Tus ideas importan, crea issues o PR's al repo https://github.com/jsanguinetti/challonge-bot y https://github.com/jsanguinetti/challonge.
        \`\`\`
      `,
      attachments
    });
  } catch (error) {
    errorHandler(bot, message, error);
  }
};
