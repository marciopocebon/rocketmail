module.exports = (aws) => {
  const sqs = new aws.SQS({ apiVersion: '2012-11-05' });

  return {
    getQuota: (callback) => ses.getSendQuota((err, data) => {
      if (err) console.log(err);

      callback(data);
    }),
  }
};
