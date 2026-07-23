//
//  This repository shall:
//  - Connect to the database (using the pool provided by the database.js)
// -  Perfrom the SQL querries to implement the bellow API
//

import { pool } from "../utils/database.js";

// Get all articles
export async function getArticles() {
    // TODO
    const [rows] = await pool.query("SELECT * FROM articles");
    return rows;
}

// Get one article by ID
export async function getArticleById(id) {
    // TODO
    const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?", [id]);
    return rows[0] || null;
}

// Create a new article
export async function createArticle(article) {
    // TODO
    const { title, content, journalist, category } = article;
    const [result] = await pool.query(
        "INSERT INTO articles (title, content, journalist, category) VALUES (?, ?, ?, ?)",
        [title, content, journalist, category]
    );

    return { id: String(result.insertId), title, content, journalist, category };
}

// Update an article by ID
export async function updateArticle(id, updatedData) {
    // TODO
    const allowedFields = ["title", "content", "journalist", "category"];
    const fields = allowedFields.filter((field) => updatedData[field] !== undefined);

    if (fields.length === 0) {
        return getArticleById(id);
    }

    const assignments = fields.map((field) => `${field} = ?`).join(", ");
    const values = fields.map((field) => updatedData[field]);
    const [result] = await pool.query(
        `UPDATE articles SET ${assignments} WHERE id = ?`,
        [...values, id]
    );

    if (result.affectedRows === 0) return null;
    return getArticleById(id);
}

// Delete an article by ID
export async function deleteArticle(id) {
    // TODO
    const [result] = await pool.query("DELETE FROM articles WHERE id = ?", [id]);
    return result.affectedRows > 0;
}
