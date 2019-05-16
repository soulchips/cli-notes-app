const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Custom app version number
yargs.version('1.1.0')

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: "Note's title",
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: "Note's body",
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    let res = notes.addNote(argv.title, argv.body)
    console.log(res.message)
  }
})

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: "Note's title",
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    let res = notes.removeNote(argv.title)
    console.log(res.message)
  }
})

// Create remove command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler() {
    console.log('Reading note')
  }
})

// Create remove command
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler() {
    console.log('Listing all notes')
  }
})

// Create remove command
yargs.command({
  command: 'edit',
  describe: 'Edit a note',
  handler() {
    console.log('Editing a note')
  }
})

yargs.parse()