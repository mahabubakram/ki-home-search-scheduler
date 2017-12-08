var ses = require('node-ses'), client = ses.createClient({ key: '', secret: '' , amazon: ''});

module.exports = {

   sendEmail: function(message) {
       console.log(message);
       console.log(client);
       client.sendEmail({
          to: 'm.khan@kigroup.de'
        , from: 'm.khan@kigroup.de'
        , subject: 'greetings'
        , message: 'your <b>'+message+'</b> goes here'
        , altText: 'plain text'
       }, function (err, data, res) {
         console.log(err);
         console.log(data);
         console.log(res);
       });
   }
};
