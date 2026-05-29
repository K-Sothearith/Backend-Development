import { articles, categories, journalists } from '../models/data.js';

export const getArticles = (req, res) => {
    res.json(articles);
};

export const getArticleById = (req, res) => {
    const articleId = parseInt(req.params.id);
    const article = articles.find(a => a.id === articleId);

    if (!article) return res.status(404).json({ error: 'Article not found' });

    res.json(article);
};

export const createArticle = (req, res) => {
    const { title, content, journalistId, categoryId } = req.body;

    if (!title || !content || !journalistId || !categoryId) {
        return res.status(400).json({ error: 'Title, content, journalistId, and categoryId are required' });
    }

    const journalist = journalists.find(j => j.id === journalistId);
    if (!journalist) return res.status(400).json({ error: 'Journalist not found' });

    const category = categories.find(c => c.id === categoryId);
    if (!category) return res.status(400).json({ error: 'Category not found' });

    const newArticle = {
        id: articles.length + 1,
        title,
        content,
        journalistId,
        categoryId
    };

    articles.push(newArticle);
    res.status(201).json(newArticle);
};

export const updateArticle = (req, res) => {
    const articleId = parseInt(req.params.id);
    const { title, content, journalistId, categoryId } = req.body;

    const article = articles.find(a => a.id === articleId);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    if (journalistId) {
        const journalist = journalists.find(j => j.id === journalistId);
        if (!journalist) return res.status(400).json({ error: 'Journalist not found' });
        article.journalistId = journalistId;
    }

    if (categoryId) {
        const category = categories.find(c => c.id === categoryId);
        if (!category) return res.status(400).json({ error: 'Category not found' });
        article.categoryId = categoryId;
    }

    if (title) article.title = title;
    if (content) article.content = content;

    res.json(article);
};

export const deleteArticle = (req, res) => {
    const articleId = parseInt(req.params.id);
    const index = articles.findIndex(a => a.id === articleId);

    if (index === -1) return res.status(404).json({ error: 'Article not found' });

    articles.splice(index, 1);
    res.status(204).send();
};
