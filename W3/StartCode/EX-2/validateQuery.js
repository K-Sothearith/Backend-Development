function parseOptionalInt(value) {
  if (value === undefined) return { ok: true, value: undefined };
  if (Array.isArray(value)) return { ok: false, error: 'Expected a single value.' };
  if (!/^-?\d+$/.test(String(value))) return { ok: false, error: `Invalid integer: ${value}` };
  return { ok: true, value: Number.parseInt(String(value), 10) };
}

export default function validateQuery(req, res, next) {
  const minParsed = parseOptionalInt(req.query.minCredits);
  if (!minParsed.ok) {
    const message = `minCredits: ${minParsed.error}`;
    if (req.accepts('html')) {
      return res.status(400).type('html').send(`<h1 style="font-size:64px;margin:0;"><strong>400 BAD REQUEST</strong></h1><p>${message}</p>`);
    }
    return res.status(400).json({ error: message, status: 400 });
  }

  const maxParsed = parseOptionalInt(req.query.maxCredits);
  if (!maxParsed.ok) {
    const message = `maxCredits: ${maxParsed.error}`;
    if (req.accepts('html')) {
      return res.status(400).type('html').send(`<h1 style="font-size:64px;margin:0;"><strong>400 BAD REQUEST</strong></h1><p>${message}</p>`);
    }
    return res.status(400).json({ error: message, status: 400 });
  }

  if (
    minParsed.value !== undefined &&
    maxParsed.value !== undefined &&
    minParsed.value > maxParsed.value
  ) {
    const message = 'minCredits must be <= maxCredits';
    if (req.accepts('html')) {
      return res.status(400).type('html').send(`<h1 style="font-size:64px;margin:0;"><strong>400 BAD REQUEST</strong></h1><p>${message}</p>`);
    }
    return res.status(400).json({ error: message, status: 400 });
  }

  req.parsedCredits = { minCredits: minParsed.value, maxCredits: maxParsed.value };
  next();
}
