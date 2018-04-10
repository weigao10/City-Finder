const express = require('express');
const app = express();

app.use(express.static(__dirname + '/../client/dist'));

let port = 3000

app.listen(port, () => {
  console.log('Listening on port: ', port);
})