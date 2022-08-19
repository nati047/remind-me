const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendSms = async (data, onComplete) => {
  console.log("  data in sendMessage \n ************ ", data);
  try {
    const { to, from, body } = data;

    const response = await client.messages.create({ to, from, body });

    console.log("message sent sucessfully");

    onComplete(data);

    return;
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = sendSms;
