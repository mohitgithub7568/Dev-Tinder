const {sesClient} = require("./sesClient");
const { SendEmailCommand } = require("@aws-sdk/client-ses");

// email code from aws documentation

const createSendEmailCommand = (toAddresses,fromAddress, subject, body) => {
    return new SendEmailCommand({
        Destination: {
            ToAddresses: [toAddresses],
        },
        Message: {
            Body: {
                Html: { Data: `<h1>${body}</h1>`, Charset: "UTF-8"  },
                Text: { Data: "<p>This is a simple text message.</p>", Charset: "UTF-8" },
            },
            Subject: { Data: subject, Charset: "UTF-8" },
        },
        Source: fromAddress,
        ReplyToAddresses: [],
    });
};

const run = async (subject, body) => {
  const sendEmailCommand = createSendEmailCommand(
    "creature7568@gmail.com",
    "mohit.work75@gmail.com",
    subject, body
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

module.exports = {run};

