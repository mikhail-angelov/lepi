#!/usr/bin/env node

const program = require('commander')
const path = require('path')

program
  .version(require('../package.json').version)
  .usage('[options]')
  .option('-c, --config <path>', 'config filename')

program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    # run lepi with default config lepifile.js');
  console.log('    $ lepi');
  console.log('');
  console.log('    # run lepi with custom config');
  console.log('    $ lepi ./my-config.js');
  console.log('');
})

program.parse(process.argv);
if (program.config) {
  require(path.join(process.cwd(), program.config))
} else {
  require('./lepifile.js')
}
