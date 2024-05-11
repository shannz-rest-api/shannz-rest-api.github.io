const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const fetch = require("node-fetch");

const { fetchJson } = require('./lib/myfunc');
const scr = require('./lib/index');

const app = express();
const PORT = process.env.PORT || 3000;
app.enable("trust proxy");
app.set("json spaces", 2);

// Mess err
mess = {
    error: {
        status: false,
        message: 'Error, Service Unavaible',
        maintanied_by: 'Shannz'
    },
    noturl: {
    	status: false,
    	message: 'Error, Invalid Url',
    	maintanied_by: 'Shannz'
    },
    notquery: {
    	status: false,
    	code: 403,
    	message: 'Error, Invalid Query',
    	maintanied_by: 'Shannz'
    }
}

// Middleware untuk CORS
app.use(cors());

app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
 res.sendFile(path.join(__dirname, 'About', 'page.html'));
});

app.get('/project', (req, res) => {
 res.sendFile(path.join(__dirname, 'Project', 'page.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Dashboard', 'page.html'));
});

app.get('/stats', (req, res) => {
  const stats = {
    platform: os.platform(),
    architecture: os.arch(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    uptime: os.uptime(),
    cpuModel: os.cpus()[0].model,
    numCores: os.cpus().length,
    loadAverage: os.loadavg(),
    hostname: os.hostname(),
    networkInterfaces: os.networkInterfaces(),
    osType: os.type(),
    osRelease: os.release(),
    userInfo: os.userInfo(),
    processId: process.pid,
    nodeVersion: process.version,
    execPath: process.execPath,
    cwd: process.cwd(),
    memoryUsage: process.memoryUsage()
  };
  res.json(stats);
});

app.get('/shannz-api/ragbot', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await scr.ragBot(message);
    res.status(200).json({
      status: 200,
      creator: "Shannz",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk degreeGuru
app.get('/shannz-api/degreeguru', async (req, res) => {
  try {
    const { message }= req.query;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await scr.degreeGuru(message);
    res.status(200).json({
      status: 200,
      creator: "Shannz",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk smartContract
app.get('/shannz-api/smartcontract', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await scr.smartContract(message);
    res.status(200).json({
      status: 200,
      creator: "Shannz",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint untuk blackboxAIChat
app.get('/shannz-api/blackboxAIChat', async (req, res) => {
  try {
    const message = req.query.message;
    if (!message) {
      return res.status(400).json({ error: 'Parameter "message" tidak ditemukan' });
    }
    const response = await scr.blackboxAIChat(message);
    res.status(200).json({
      status: 200,
      creator: "Shannz",
      data: { response }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Endpoint untuk unsplash
app.get('/shannz-api/unsplash', async (req, res) => {
 const searchText = req.query.text;
 try {
  const unsplashUrl = `https://api.unsplash.com/search/photos?query=${searchText}&client_id=lGtZdT9F38vGgi3ndODehiZ0SbvSHrs-o-w7650QTUY`;
  const response = await axios.get(unsplashUrl);

  if (response.data.results.length === 0) {
   res.json({ status: 'error', code: '500', author: 'Shannz', message: 'Gambar yang diminta tidak ditemukan' });
   return;
  }

  const result = response.data.results.map(result => ({
   imageUrl: result.urls.full,
   authorImg: result.user.name,
   views: result.views,
   downloads: result.downloads
  }));

  const jsonResponse = JSON.stringify({ status: 'success', code: '200', author: 'Shannz', result: result }, null, 4);

  res.setHeader('Content-Type', 'application/json');
  res.send(jsonResponse);
 } catch (error) {
   res.status(500).json({ error: error.message });
 }
});

// Handle 404 error
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// Handle error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app
