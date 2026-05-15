// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const SUBMISSIONS_FILE = path.join(__dirname, 'submissions.txt');

function parseFormUrlEncoded(rawBody) {
    const result = {};
    const pairs = rawBody.split('&');

    for (const pair of pairs) {
        if (!pair) continue;
        const eqIndex = pair.indexOf('=');
        const rawKey = eqIndex >= 0 ? pair.slice(0, eqIndex) : pair;
        const rawValue = eqIndex >= 0 ? pair.slice(eqIndex + 1) : '';

        const key = decodeURIComponent(rawKey.replace(/\+/g, ' '));
        const value = decodeURIComponent(rawValue.replace(/\+/g, ' '));

        result[key] = value;
    }

    return result;
}

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end('Welcome to the Home Page');
    }

    if (url === '/contact' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" />
            <button type="submit">Submit</button>
          </form>
        `);
        return;
    }

    if (url === '/contact' && method === 'POST') {
        let body = '';

        req.on('error', () => {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Bad Request');
        });

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            try {
                const form = parseFormUrlEncoded(body);
                const name = (form.name ?? '').trim();

                console.log('Contact form submission:', { name });

                if (!name) {
                    res.writeHead(400, { 'Content-Type': 'text/html' });
                    return res.end(`
                        <h1>Missing name</h1>
                        <p>Please go back and enter your name.</p>
                        <a href="/contact">Back to contact form</a>
                    `);
                }

                fs.appendFile(SUBMISSIONS_FILE, `${name}\n`, 'utf8', (err) => {
                    if (err) {
                        console.error('Failed to write submission:', err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        return res.end('Internal Server Error');
                    }

                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    return res.end(`
                        <h1>Thanks, ${name}!</h1>
                        <p>Your submission was saved.</p>
                        <a href="/contact">Submit another</a>
                    `);
                });
            } catch (err) {
                console.error('Failed to handle form submission:', err);
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                return res.end('Invalid form data');
            }
        });

        return;
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        return res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
