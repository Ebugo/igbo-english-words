const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');

let alphabet = {};

alphabet.getAlphabet = async (req, res) => {
  try {
    let alphabet = req.params.alphabet;
    let result;

    (async () => {
      const response = await fetch(`http://www.igboenglish.com/${alphabet != 'a' ? `igbo-nigerian-words-${alphabet}.php` : ''}`);
      const text = await response.text();
      const dom = await new JSDOM(text);

      result = [];

      let found = false;
      let array = dom.window.document.querySelectorAll('td');

      for (let i = 0; i < array.length; i++) {
        // if (array[i].textContent == '" IGBO Word Continuous Meaning ENGLISH BEKEE "')
        if (array[i].textContent.search(/BEKEE/gi) >= 0)
          found = true;
        if (found) result.push(array[i].textContent);
      }
      let arr = result;
      result = arr.filter((arr) => {
        return !arr.includes("adsbygoogle");
      });

      result.splice(0, 4);
      arr = result;
      result = arr.filter((arr) => {
        return !arr.trim() == '' && (/[a-z]/i).test(arr);
      });
      result.splice(0, 1);

      arr = result;
      let length = arr.length;
      let obj = {};
      for (let i = 0; i < length; i++) {
        console.log(String(arr[i]).length)
        if (arr[i].includes('mkpọtụ')) {
          obj.instance = arr[i];
          ++i
        }
        if (arr[i].length < 500) obj[arr[i]] = arr[++i];
        else obj.PS = arr[i];
        --length;
      }
      result = obj;

      return res.status(200).json({ status: true, data: result, message: 'Success' })
    })();

    // if (!result) 
    //   return res.status(400).json({ status: false, message: 'Error' });
  } catch (error) {
    res.status(400).json({ status: false, message: 'Error' });
  }
};

module.exports = alphabet;
