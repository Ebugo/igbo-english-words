const table = require('./convertObjToTable');
const alphabet = require('./getAlphabet');

const app = require('express')();

const port = 8001;

app.listen(process.env.PORT || port, () => {
  console.log(`App running and listening to port ${process.env.PORT || port}`)
});

app.get('/', (req, res) => {
  res.send('Home')
});

app.get('/get/table', table.getTable);

app.get('/get/:alphabet', alphabet.getAlphabet);

app.get('/words', alphabet.getWord);
