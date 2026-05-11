const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8082;
const BASE = __dirname;

const mime = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.mp4':  'video/mp4',
  '.MP4':  'video/mp4',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
};

http.createServer(function(req, res) {
  let filePath = path.join(BASE, req.url === '/' ? '/index.html' : req.url);
  const ext = path.extname(filePath);
  const type = mime[ext] || 'application/octet-stream';

  fs.readFile(filePath, function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end('Not found: ' + req.url);
      return;
    }
    res.writeHead(200, { 'Content-Type': type });
    res.end(data);
  });
}).listen(PORT, function() {
  console.log('Server running at http://localhost:' + PORT);
});
