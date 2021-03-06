let attachments = [
  {
    title: "Empezá por usar `/challonge_login challonge_username N`",
    color: "#2FA44F",
    text:
      "`/challonge_login challonge_username` Te loguea en el bot. Es necesario una única vez. Si tu usuario no se encuentra en el último torneo registrado (ver `/challonge torneos`) usar el nro de torneo como `N`",
    mrkdwn_in: ["text"]
  },
  {
    title: "Challonge Bot tiene una lista de torneos registrados",
    color: "#2FA44F",
    text: "`/challonge torneos` devuelve la lista de torneos registrados",
    mrkdwn_in: ["text"]
  },
  {
    title: "Challonge Bot te trae tus partidos y sabe cuándo te toca jugar",
    color: "#2FA44F",
    text:
      "`/challonge partidos` Muestra la lista de partidos jugados y pendientes para el último torneo de la lista\n" +
      "`/challonge partidos N` donde `N` es el número de torneo. Muestra la lista para el torneo seleccionado",
    mrkdwn_in: ["text"]
  },
  {
    title: "Challonge Bot conoce el ranking",
    color: "#2FA44F",
    text: "`/challonge ranking` Muestra la tabla del ranking",
    mrkdwn_in: ["text"]
  },
  {
    title: "Challonge Bot Ayuda",
    color: "#2FA44F",
    text: "`/challonge help` ... Lo estás viendo! \n",
    mrkdwn_in: ["text"]
  }
];

module.exports = errorHandler => async bot => {
  try {
    bot.httpBody({
      text: `
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
