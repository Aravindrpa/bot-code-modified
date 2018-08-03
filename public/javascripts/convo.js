var botui = new BotUI('api-bot');

var socket = io.connect('http://localhost:8010');
// read the BotUI docs : https://docs.botui.org/

botui.message.add({
  content: 'Lets Start Talking...',
  delay: 1500,
}).then(function () {
  botui.action.text({
    action: {
      placeholder: 'Say Hello',
    }
  }
  ).then(function (res) {
    socket.emit('fromClient', { client: res.value }); // sends the message typed to server
    console.log(res.value); // will print whatever was typed in the field.
  }).then(function () {
    socket.on('fromServer', function (data) { // recieveing a reply from server.
      
      console.log(data.server);
      console.log(data);
      newMessage(data);
      //if(data.result.metadata.endConversation)
      //{
      //addEndPromt(); 
      //}
      //else
      //{
      //  addAction();
      //}
    })
  });
})


function addEndPromt() {
  botui.action.text({
    action: {
      placeholder: 'Do you wish to continue? ... (Yes/No)',
    }
  }).then(function (res) {
    socket.emit('fromClient', { client: res.value });
    console.log('client response: ', res.value);
  })
}

function newMessage(response) {

  try {
    console.log("hhh");
    console.log(response);
    if (response.result.metadata.endConversation === true) {
      console.log("here");
    }
    else {
      console.log("Not done");
    }
  }
  catch (error) {
    console.log("In exception");
    console.error(error);
  }

  botui.message.add({
    content: response.server,
    delay: 0,
  });
  
  addAction();
}

function addAction() {
  botui.action.text({
    action: {
      placeholder: 'enter response...',
    }
  }).then(function (res) {
    console.log(res);
    socket.emit('fromClient', { client: res.value });
    console.log('client response: ', res.value);
  })
}