const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Custom app version number
// yargs.version('1.0.0')

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
    printResult(res)
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
    printResult(res)
  }
})

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note\'s title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    printResult(notes.readNote(argv.title))
  }
})

// Create list command
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler() {
    let res = notes.listNotes()
    printResult(res)
    console.log(res.list)
  }
})

// Create update command
yargs.command({
  command: 'edit',
  describe: 'Update a note\'s body',
  handler() {
    console.log('Editing a note')
  }
})


// Adding color to results
const printResult = (res) => {
  switch (res.status) {
    case 0:
      console.log(chalk.green.inverse(res.message))
      break
    case 1:
      console.log(res.message)
      break
    case 2:
      console.log(chalk.red.inverse(res.message))
      console.log(res.error)
  }
}

yargs.parse()