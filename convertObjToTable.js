const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

let table = {};

table.getTable = async (req, res) => {
  try {
    let result;

    (async () => {
      const response = await fetch('http://localhost:8080/api/v1/words?keyword=hunger');
      const data = await response;
      // const dom = await new JSDOM(text);
    
      result = [];
      // dom.window.document.querySelectorAll('tr').forEach(data => {
      //   result.push(data.textContent);
      // });
      console.log(data)
      return res.status(200).json({ status: true, data, message: 'Success'})
    })(); 

    // if (!result) 
    //   return res.status(400).json({ status: false, message: 'Error' });
  } catch (error) {
    res.status(400).json({ status: false, message: 'Error' });
  }   
};


module.exports = table;
