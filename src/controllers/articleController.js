const admin = require('firebase-admin'); // Tambahkan ini
const db = require('../../config/firebase');

exports.getAllArticles = async (req, res) => {
    try {
        const snapshot = await db.collection('articles').get();
        const articles = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(articles);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await db.collection('articles').doc(id).get();
        if (doc.exists) {
            res.json({ id: doc.id, ...doc.data() });
        } else {
            res.status(404).send('Article not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.createArticle = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newArticle = {
            title,
            content,
            author,
            createdAt: admin.firestore.FieldValue.serverTimestamp() // Gunakan admin.firestore.FieldValue
        };
        const docRef = await db.collection('articles').add(newArticle);
        res.status(201).json({ id: docRef.id, ...newArticle });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;
        const updatedArticle = {
            title,
            content,
            author,
            updatedAt: admin.firestore.FieldValue.serverTimestamp() // Gunakan admin.firestore.FieldValue
        };
        const doc = await db.collection('articles').doc(id).get();
        if (doc.exists) {
            await db.collection('articles').doc(id).update(updatedArticle);
            res.json({ id, ...updatedArticle });
        } else {
            res.status(404).send('Article not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

exports.deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const doc = await db.collection('articles').doc(id).get();
        if (doc.exists) {
            await db.collection('articles').doc(id).delete();
            res.status(204).send();
        } else {
            res.status(404).send('Article not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
