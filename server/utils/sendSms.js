const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendSms = async (data, onComplete) => {
  try {
    const { to, from, body } = data;

    const response = await client.messages.create({ to, from, body: `Hey, it's time to - ${body}` });

    onComplete(data);

    return;
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = sendSms;
