const readline = require('readline')
const chalk = require('chalk')
const clear = require('clear')
const figlet = require('figlet')
const CLI = require('clui')
const Spinner = CLI.Spinner
const status = new Spinner('');

const commands = {}
process.stdout.write("\x1Bc")
clear()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'lepi> '
})
  .on('line', prosessCommand)
  .on('close', close)
rl.prompt()

function prosessCommand(cmd) {
  const params = (cmd || '').trim().split(/\s+/)
  console.log('--', params)
  const handler = commands[params[0]] //todo: find commands by params as well
  if (handler) {
    status.start()
    handler(params, (close) => {
      status.stop()
      !!close ? close() : rl.prompt()
    })
  } else {
    log(`Unknown command: ${cmd}, try another one`, 'red')
    rl.prompt()
  }
}

function close() {
  console.log('Bye')
  process.exit(0)
}

function command(cmd, handler) {
  commands[cmd] = handler
}
//trick to cool output
function log(text, color) {
  const pen = chalk[color] || chalk.white
  const t = Math.ceil((rl.line.length + 3) / process.stdout.columns)
  rl.output.write("\n\r\x1B[" + t + "A\x1B[0J")
  rl.output.write(pen(typeof text === 'function' ? text(): text) + "\n\r")
  rl.output.write(Array(t).join("\r\x1B[1E"))
  rl._refreshLine()
}

function title(text, color) {
  log(()=>figlet.textSync(text, { horizontalLayout: 'full' }),color)
  rl.prompt()
}

module.exports = {
  command,
  title,
  log,
}

