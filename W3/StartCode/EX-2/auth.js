// Token-Based Authentication Middleware
const VALID_TOKEN = process.env.TOKEN || 'xyz123';

export default function requireToken(req, res, next) {
  const token = req.query.token;

  if (token !== VALID_TOKEN) {
    const message = 'Unauthorized: missing or invalid token';
    if (req.accepts('html')) {
      return res
        .status(401)
        .type('html')
        .send(`<h1 style="font-size:64px;margin:0;"><strong>401</strong></h1><p>${message}</p>`);
    }
    return res.status(401).json({ error: message, status: 401 });
  }

  next();
}
