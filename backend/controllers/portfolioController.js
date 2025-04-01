const axios = require('axios');
const xml2js = require('xml2js');

const getMediumFeed = async (req, res) => {
    try {
      const mediumFeedUrl = 'https://medium.com/feed/@rutikbhosale';
  
      const response = await axios.get(mediumFeedUrl, {
        headers: {
            "Accept": "application/xml",
            "User-Agent": "Mozilla/5.0", 
          },
      });
  

      xml2js.parseString(response.data, { trim: true, explicitArray: false }, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err);
          return res.status(500).json({ message: 'Error parsing XML data' });
        }
        const feedData = result.rss.channel;
        res.json(feedData);
      });
  
    } catch (error) {
      console.error('Error fetching Medium feed:', error);
      res.status(500).json({ message: 'Error fetching Medium feed' });
    }
  };
  module.exports = { getMediumFeed };
