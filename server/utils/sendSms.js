const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendMessage = async (onComplete, to, from, body) => {
  const response = await client.messages.create({
    to: to,
    from: from,
    body: body
  })
    .then((msg) => {
      console.log('sucess');
      return 'success';
    }).catch(err => {
      console.log('error',err);
      return 'error';
    });
    onComplete(to);
  return response;
}

module.exports = sendMessage;