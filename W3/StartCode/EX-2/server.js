import express from 'express';
import courses from './course.js';

import logger from './logger.js';
import validateQuery from './validateQuery.js';
import requireToken from './auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', requireToken, validateQuery, (req, res) => {
  const dept = String(req.params.dept || '').trim().toUpperCase();

  const level = req.query.level ? String(req.query.level).toLowerCase() : undefined;
  const semester = req.query.semester ? String(req.query.semester).toLowerCase() : undefined;
  const instructor = req.query.instructor ? String(req.query.instructor).toLowerCase() : undefined;
  const { minCredits, maxCredits } = req.parsedCredits;

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
  const message = `Route not found: ${req.method} ${req.path}`;
  if (req.accepts('html')) {
    return res
      .status(404)
      .type('html')
      .send(`<h1 style="font-size:64px;margin:0;"><strong>404</strong></h1><p>${message}</p>`);
  }
  return res.status(404).json({ error: message, status: 404 });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
