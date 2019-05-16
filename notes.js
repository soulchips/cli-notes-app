const fs = require('fs')


const listNotes = () =>  {
    let notes = loadNotes()
    let noteTitles = []

    notes.forEach((note) => {
        noteTitles.push(note.title)
    })

    return {
        status: 0,
        message: 'Your Notes:',
        list: noteTitles
    }
}

const addNote = (title, body) => {
    let notes = loadNotes()
    let duplicateNote = findNote(notes, title)

    if(duplicateNote) {
        return {
            status: 1,
            message: 'Note cannot be saved. Title must be unique'
        }
    }

    notes.push({
        title: title,
        body: body
    })

    return saveNotes(notes)
}

const removeNote = (title) => {
    let notes = loadNotes()
    let notesFiltered = notes.filter((note) => note.title != title)

    if(notesFiltered.length < notes.length) {
        let res = saveNotes(notesFiltered)
        
        if(res.status === 0) {
            res.message = `Note: ${title} has been removed`
            return res
        }
    } else {
        return {
            status: 1,
            message: `Note: ${title} could not be found`
        }
    }
}

const readNote = (title) => {
    let notes = loadNotes()
    let note = findNote(notes, title)

    if(note) {
        return {
            status: 0,
            message: note.body
        }
    }

    return {
        status: 1,
        message: `Could not find note for ${title}`
    }
}

const findNote = (notes, title) => {
    return notes.find((note) => note.title === title)
}

const saveNotes = (notes) => {
    // overwrite file with new notes object
    try {
        notes = JSON.stringify(notes)
        fs.writeFileSync('notes.json', notes)
        return {
            status: 0,
            message: 'Note saved'
        }
        
    } catch (e) {
        return {
            status: 2,
            message: 'Note could not be saved',
            error: e
        }
    }
}

const loadNotes = () => {
    // read notes.json, convert to string and parse to JSON. then return
    try {
        return JSON.parse(fs.readFileSync('notes.json').toString())
    } catch (e) {
        return []
    }
}

module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}