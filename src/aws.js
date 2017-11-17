
const aws = require('aws-sdk');

aws.config.loadFromPath('config.json');

const ses = require('./modules/ses')(aws);
const sqs = require('./modules/sqs')(aws);

const emails = [
  'cleiton@rocketseat.com.br',
  'cleiton7souza@gmail.com',
  'diego.schell.f@gmail.com',
  'diego@rocketseat.com.br',
  'robson@rocketseat.com.br',
  'oi@rocketseat.com.br',
  'diego.sfernandes@live.com',
];

emails.map(mail => {
  ses.sendMail(mail, info => {
    console.log(info.messageId);
  });
});

// const quota = ses.getQuota(data => {
//   const { Max24HourSend, MaxSendRate, SentLast24Hours } = data;

//   const canSend = Max24HourSend - SentLast24Hours;

//   console.log(canSend);
// });

// const params = {
//   DelaySeconds: 10,
//   MessageAttributes: {
//     "Subject": {
//       DataType: "String",
//       StringValue: "Teste de assunto"
//     },
//     "To": {
//       DataType: "String",
//       StringValue: "diego@rocketseat.com.br"
//     },
//   },
//   MessageBody: "Just testing",
//   QueueUrl: "https://sqs.us-east-1.amazonaws.com/011801494293/EmailQueue"
// };

// sqs.sendMessage(params, (err, data) => {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.MessageId);
//   }
// });


// var params = {
//   MaxNumberOfMessages: 10,
//   MessageAttributeNames: [
//     "All"
//   ],
//   QueueUrl: 'https://sqs.us-east-1.amazonaws.com/011801494293/EmailQueue',
//   WaitTimeSeconds: 20
// };

// sqs.receiveMessage(params, function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data);
//   }
// });



