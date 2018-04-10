const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.listen(PORT || 3000, () => {
  console.log('server listening on 3000!')
})

// console.log(path.join(__dirname, '/client/dist'));