const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  pool: true,
  maxMessages: Infinity,
  maxConnections: 50,
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 465,
  secure: true,
  auth: {
    user: 'AKIAJ6TMC5OTBQ4JHYVQ',
    pass: 'Al6P6ecxbxvnnK5StFM88UC+FCVuF6k3ocL/oJ0ZkJEy'
  }
});

let mailOptions = {
  from: '"Diego | RocketSeat" <diego@rocketseat.com.br>',
  to: 'oi@rocketseat.com.br',
  subject: 'Teste',
  html: '<h1>Hello World!</h1>',
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) return console.log(err);

  console.log('Sent: %s', info.messageId);
});
