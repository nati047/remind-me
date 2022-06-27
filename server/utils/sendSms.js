const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendMessage = async (onComplete, to, from, body) => {
  try {
    const response = await client.messages.create({
      to: to,
      from: from,
      body: body
    });

    console.log('sucess');
    onComplete(to);
    return 'success'; // TODO fix return

  } catch (err) {
    console.log('twilio error', err);
    return 'error';
  }
  
}

module.exports = sendMessage;