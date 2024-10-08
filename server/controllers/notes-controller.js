import db from "../config/db-config.js"

const getAllNotes = async (req, res) => {
    await db.query("SELECT * FROM notes", (err, rows) => {
        try {
            res.json(rows)
        } catch (err) {
            res.json(err)
        }
    })
}

const getOneNote = async (req, res) => {
    await db.query(`SELECT * FROM notes WHERE uid = "${req.params.uid}"`, (err, rows) => {
        try {
            res.json(rows)
        } catch (err) {
            res.json(err)
        }
    })
}

const addNewNote = async (req, res) => {
    let { uid, description, created_at, is_important, is_complete } = req.body;

    is_important = is_important ? 1 : 0;
    is_complete = is_complete ? 1 : 0;

    await db.query(`INSERT INTO notes (uid, description, created_at, is_important, is_complete) VALUES ('${uid}','${description}', '${created_at}',${is_important}, ${is_complete})`, (err, rows) => {
        try {
            res.json(rows)
        }
        catch (err) {
            res.json(err);
        }
    })

}

const deleteNote = async (req, res) => {
    await db.query(`DELETE FROM notes where uid = '${req.params.uid}'`, (err, rows) => {
        try {
            res.json(rows);
        }
        catch (err) {
            res.json(err);
        }
    })
}

const toogleImportance = async (req, res) => {
    await db.query(`UPDATE notes SET is_important = CASE WHEN is_important THEN 0 ELSE 1 END WHERE uid = '${req.params.uid}'`, (err, rows) => {
        try {
            res.json(rows);
        }
        catch (err) {
            res.json(err);
        }
    })
}

const toogleCompletion = async (req, res) => {
    await db.query(`UPDATE notes SET is_complete = CASE WHEN is_complete THEN 0 ELSE 1 END WHERE uid ='${req.params.uid}'`, (err, rows) => {
        try {
            res.json(rows);
        }
        catch (err) {
            res.json(err);
        }
    })
}

const editDesc = async (req, res) => {
    await db.query(`UPDATE notes SET description = '${req.body.description}', is_important = '${(req.body.is_important) ? 1 : 0}' where uid = '${req.body.uid}'`, (err, rows) => {
        try {
            res.json(rows);
        }
        catch (err) {
            res.json(err);
        }
    })
}


export default { getAllNotes, getOneNote, addNewNote, deleteNote, toogleImportance, toogleCompletion, editDesc }
