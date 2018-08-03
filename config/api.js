var apiai = require('apiai');

// read the api.ai docs : https://api.ai/docs/

//Enter your API Key
var app = apiai('aea6ea6f29b14fbf843bc8b6c07848d4');
//var app = apiai('ca7612c4853f47e7b99da21a7786e22e'); 


// Function which returns speech from api.ai
var getRes = function (query) {
  var request = app.textRequest(query, {
    sessionId: '<unique session id>'
  });
  const responseFromAPI = new Promise(
    function (resolve, reject) {
      request.on('error', function (error) {
        reject(error);
      });
      request.on('response', function (response) {
        console.log(response);
        try{
        console.log(response.result.fulfillment.messages[0].speech); 
        //TODO: Handle multiple messages
        }
        catch(error)
        {}
        //if(response.result.metadata.endConversation === true)
          resolve(response.result.fulfillment.speech);
          //console.log(response);
      });
    });
  request.end();
  return responseFromAPI;
};

// test the command :
//getRes('hello').then(function(res){console.log(res)});

module.exports = { getRes }
