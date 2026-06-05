const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const SUBMISSIONS_FILE = path.join(__dirname, 'submissions.txt');

app.use((req, _res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use(express.urlencoded({ extended: false }));

app.get('/', (_req, res) => {
  res.type('text').send('Welcome to the Home Page');
});

app.get('/contact', (_req, res) => {
  res.type('html').send(`
    <form method="POST" action="/contact">
      <input type="text" name="name" placeholder="Your name" />
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/contact', (req, res) => {
  const name = String(req.body?.name ?? '').trim();

  console.log('Contact form submission:', { name });

  if (!name) {
    return res.status(400).type('html').send(`
      <h1>Missing name</h1>
      <p>Please go back and enter your name.</p>
      <a href="/contact">Back to contact form</a>
    `);
  }

  fs.appendFile(SUBMISSIONS_FILE, `${name}\n`, 'utf8', (err) => {
    if (err) {
      console.error('Failed to write submission:', err);
      return res.status(500).type('text').send('Internal Server Error');
    }

    return res.type('html').send(`
      <h1>Thanks, ${name}!</h1>
      <p>Your submission was saved.</p>
      <a href="/contact">Submit another</a>
    `);
  });
});

app.use((_req, res) => {
  res.status(404).type('text').send('404 Not Found');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

