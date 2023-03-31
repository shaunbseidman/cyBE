const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors());

app.get('/ipwho.is/:ip', (req, res) => {
  const ip_address = req.params.ip;

  const options = {
    hostname: 'ipwho.is',
    path: `/${ip_address}`,
    method: 'GET'
  };

  http.get(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      const whoisInfo = JSON.parse(data);
      res.json(whoisInfo);
    });
  }).on('error', (error) => {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve WHOIS information.' });
  });
});
app.get('/dns/:domain', (req, res) => {
  const domainName = req.params.domain;
  const apiKey = 'at_ta87saEAoKoD5j66LJ7W18KAkTeLA';
  const options = {
    hostname: 'www.whoisxmlapi.com',
    path: `/whoisserver/DNSService?apiKey=${apiKey}&domainName=${domainName}&type=_all&outputFormat=JSON`,
    method: 'GET',
    protocol: 'http:'
  };

  http.get(options, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      const dnsInfo = JSON.parse(data);
      res.json(dnsInfo);
    });
  }).on('error', (error) => {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve DNS information.' });
  });
});




const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
