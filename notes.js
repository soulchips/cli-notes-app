const fs = require('fs')


const getNotes = function () {
    return 'Your notes...'
}

const addNote = (title, body) => {
    let notes = loadNotes()
    let duplicateNotes = findNote(notes, title)

    if(duplicateNotes.length > 0) {
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

const findNote = (notes, title) => {
    let resultList = notes.filter((note) => note.title === title)

    return resultList
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
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}