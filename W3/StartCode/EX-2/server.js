import express from 'express';
import courses from './course.js';
const app = express();
const PORT = process.env.PORT || 3000;

function logger(req, _res, next) {
  console.log(
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.path,
        query: req.query,
      },
      null,
      2
    )
  );
  next();
}

function parseOptionalInt(value) {
  if (value === undefined) return { ok: true, value: undefined };
  if (Array.isArray(value)) return { ok: false, error: 'Expected a single value.' };
  if (!/^-?\d+$/.test(String(value))) return { ok: false, error: `Invalid integer: ${value}` };
  return { ok: true, value: Number.parseInt(String(value), 10) };
}

function validateQuery(req, res, next) {
  const minParsed = parseOptionalInt(req.query.minCredits);
  if (!minParsed.ok) return res.status(400).json({ error: `minCredits: ${minParsed.error}` });

  const maxParsed = parseOptionalInt(req.query.maxCredits);
  if (!maxParsed.ok) return res.status(400).json({ error: `maxCredits: ${maxParsed.error}` });

  if (
    minParsed.value !== undefined &&
    maxParsed.value !== undefined &&
    minParsed.value > maxParsed.value
  ) {
    return res.status(400).json({ error: 'minCredits must be <= maxCredits' });
  }

  req.parsedCredits = { minCredits: minParsed.value, maxCredits: maxParsed.value };
  next();
}

app.use(logger);

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', validateQuery, (req, res) => {
  const dept = String(req.params.dept || '').trim().toUpperCase();

  const level = req.query.level ? String(req.query.level).toLowerCase() : undefined;
  const semester = req.query.semester ? String(req.query.semester).toLowerCase() : undefined;
  const instructor = req.query.instructor ? String(req.query.instructor).toLowerCase() : undefined;
  const { minCredits, maxCredits } = req.parsedCredits;
  
  // Implementing the filter logic
  // Hint: Use the filter method to filter the courses array based on the provided criteria

  let results = courses.filter((c) => String(c.department).toUpperCase() === dept);

  if (level) results = results.filter((c) => String(c.level).toLowerCase() === level);
  if (semester) results = results.filter((c) => String(c.semester).toLowerCase() === semester);
  if (instructor) {
    results = results.filter((c) => String(c.instructor).toLowerCase().includes(instructor));
  }
  if (minCredits !== undefined) results = results.filter((c) => Number(c.credits) >= minCredits);
  if (maxCredits !== undefined) results = results.filter((c) => Number(c.credits) <= maxCredits);

  res.json({ results, meta: { total: results.length } });
});

app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

