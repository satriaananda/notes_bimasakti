const db = require('./db');

async function createNote(title, datetime, note) {
    try {
        const [result] = await db.execute('INSERT INTO notes (title, datetime, note) VALUES (?,?,?)', [title, datetime, note]);
        return result.insertId;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

async function getAllNotes() {
    try {
    const [rows] = await db.execute('SELECT * FROM notes');
    return rows;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

async function getNoteById(id) {
    try {
      const [rows] = await db.execute('SELECT * FROM notes WHERE id = ?', [id]);
      if (rows.length > 0) {
        return rows[0];
      } else {
        throw new Error('Note not found');
      }
    } catch (error) {
      throw new Error(error.message);
    }
}

  async function updateNoteById(id, title, datetime, note) {
    try {
      await db.execute('UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?', [title, datetime, note, id]);
      return true; // Success
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function deleteNoteById(id) {
    try {
      await db.execute('DELETE FROM notes WHERE id = ?', [id]);
      return true; // Success
    } catch (error) {
      throw new Error(error.message);
    }
  }

  module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNoteById,
    deleteNoteById
  };