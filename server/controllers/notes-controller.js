import db from "../config/db-config.js"

const getAllNotes = async (req, res) => {
    const { username } = req.user
    const sql = "SELECT * FROM notes WHERE username = ?";
    await db.query(sql, [username], (err, rows) => {
        try {
            res.status(200).json(rows)
        } catch (err) {
            res.status(500).json(err)
        }
    })
}


const getOneNote = async (req, res) => {
    const uid = req.params.uid;
    const { username } = req.user
    const sql = "SELECT * FROM notes WHERE uid = ? AND username = ?";
    await db.query(sql, [uid, username], (err, rows) => {
        try {
            res.status(200).json(rows)
        } catch (err) {
            res.status(500).json(err)
        }
    })
}


const addNewNote = async (req, res) => {
    const { username } = req.user;
    let { uid, description, created_at, is_important, is_complete } = req.body;
    const sql = ("INSERT INTO notes (uid, description, created_at, is_important, is_complete, username) VALUES (?, ?, ?, ?, ?, ?)");

    is_important = is_important ? 1 : 0;
    is_complete = is_complete ? 1 : 0;

    await db.query(sql, [uid, description, created_at, is_important, is_complete, username], (err, rows) => {
        try {
            res.status(200).json(rows)
        }
        catch (err) {
            res.status(500).json(err);
        }
    })

}


const deleteNote = async (req, res) => {
    const { uid } = req.params;
    const { username } = req.user;

    const sql = "DELETE FROM notes WHERE uid = ? AND username = ?";
    await db.query(sql, [uid, username], (err, rows) => {
        try {
            res.status(200).json(rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    })
}


const toogleImportance = async (req, res) => {
    const { uid } = req.params;
    const { username } = req.user;

    const sql = "UPDATE notes SET is_important = CASE WHEN is_important THEN 0 ELSE 1 END WHERE uid = ? AND username = ?";
    await db.query(sql, [uid, username], (err, rows) => {
        try {
            res.status(200).json(rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    })
}


const toogleCompletion = async (req, res) => {
    const { uid } = req.params;
    const { username } = req.user;
    const sql = "UPDATE notes SET is_complete = CASE WHEN is_complete THEN 0 ELSE 1 END WHERE uid = ? AND username = ?";
    await db.query(sql, [uid, username], (err, rows) => {
        try {
            res.status(200).json(rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    })
}


const editDesc = async (req, res) => {
    const { uid } = req.params;
    const { username } = req.user;
    let { description, is_important } = req.body;
    is_important = is_important ? 1 : 0;

    const sql = "UPDATE notes SET description = ?, is_important = ? WHERE uid = ? AND username = ?";

    await db.query(sql, [description, is_important, uid, username], (err, rows) => {
        try {
            res.status(200).json(rows);
        }
        catch (err) {
            res.status(500).json(err);
        }
    })
}

export default { getAllNotes, getOneNote, addNewNote, deleteNote, toogleImportance, toogleCompletion, editDesc }
