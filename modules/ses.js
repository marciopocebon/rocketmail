const nodemailer = require('nodemailer');

module.exports = (aws) => {
  const ses = new aws.SES({ apiVersion: '2010-12-01' });

  const transporter = nodemailer.createTransport({
    SES: ses
  });

  let mailOptions = {
    from: '"Diego | RocketSeat" <diego@rocketseat.com.br>',
    subject: 'Teste',
    html: `
      <p>Fala dev, beleza?</p>
      <p>Estou te enviando esse e-mail para perguntar se você vai receber corretamente na caixa de entrada e não em outra caixa, grande abraço!</p>
      <strong>Diego Fernandes</strong>
    `,
  };

  return {
    getQuota: (callback) => ses.getSendQuota((err, data) => {
      if (err) return console.log(err);

      callback(data);
    }),

    sendMail: (to, callback) => transporter.sendMail({to, ...mailOptions}, (err, info) => {
      if (err) return console.log(err);

      callback(info);
    }),
  }
};
