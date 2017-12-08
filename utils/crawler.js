var request = require('request');

module.exports = {
   collect: function() {
     request.get(
        'http://localhost:3000',
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("Data collected successfully.")
            } else {
                console.log("Error while collecting data: "+error);
            }
        }
     );
   }
};
