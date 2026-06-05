const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, _res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.get('/', (_req, res) => {
  res.type('html').send(`
    <html>
      <head><title>Home</title></head>
      <body>
        <h1>Welcome to the Home Page</h1>
        <p>This is a simple Node.js server.</p>
      </body>
    </html>
  `);
});

app.get('/about', (_req, res) => {
  res.type('html').send(`
    <html>
      <head><title>About</title></head>
      <body>
        <h1>About us:</h1>
        <p>at CADT, we love node.js!</p>
      </body>
    </html>
  `);
});

app.get('/contact-us', (_req, res) => {
  res.type('html').send(`
    <html>
      <head><title>Contact-us</title></head>
      <body>
        <h1>You can reach us via email...</h1>
      </body>
    </html>
  `);
});

app.get('/products', (_req, res) => {
  res.type('html').send(`
    <html>
      <head><title>Products</title></head>
      <body>
        <h1>Buy one get one...</h1>
      </body>
    </html>
  `);
});

app.get('/projects', (_req, res) => {
  res.type('html').send(`
    <html>
      <head><title>Projects</title></head>
      <body>
        <h1>Here are our awesome projects</h1>
      </body>
    </html>
  `);
});

app.use((_req, res) => {
  res.status(404).type('text').send('404 Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

