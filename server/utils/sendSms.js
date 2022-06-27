const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendMessage = async (onComplete, data) => {
  try {
    const { to, from, body } = data;
    
    const response = await client.messages.create({ to, from, body });

    console.log('sucess');

    onComplete(data);

    return 'success'; // TODO fix return

  } catch (err) {
    console.log('twilio error', err);
    return 'error';
  }
  
}

module.exports = sendMessage;