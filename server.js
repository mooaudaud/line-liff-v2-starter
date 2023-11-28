require('dotenv').config()
console.log(process.env)
const https = require('https');
const fs = require('fs');

const path = require('path')
const { parse } = require('url');

const next = require('next')
const port = parseInt(process.env.PORT) || 4002
const dev = true;
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()


const options = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem')
};

app.prepare().then(() => {
  https.createServer(options, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err
    console.log(`> Ready on localhost:${port}`)
  })
})
