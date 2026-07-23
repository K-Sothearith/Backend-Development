import express from 'express';
import logger from './middleware/logger.js';
import articlesRoutes from './routes/articlesRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import journalistsRoutes from './routes/journalistsRoutes.js';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});
app.use(logger);
app.use('/articles', articlesRoutes);
app.use('/categories', categoriesRoutes);
app.use('/journalists', journalistsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
