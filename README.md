# lepi
nodejs command line tool

## Installation

```bash
$ npm install lepi -D
```

## API

### `command(name, handler)`
It register command in system
 `name` : `string` - command name
 `handler` : `function( args: Array, done: function)` - function to process command
  - `args` - list of command parameters, which was separate by spaces, first item is command name
  - `done` - function which has to be called once command processing is completed, if function is called with argument `true`, then application will be closed

### `log(text, color)`
It print text into console
 `text` : `string` - text to print
 `color` : `[optional] string` - one of based colors: `red`, `blue`, `green`, `yellow`, `magenta`, ...

### `title(text, color)`
It print nice title into console
 `text` : `string` - text to print
 `color` : `[optional] string` - one of based colors: `red`, `blue`, `green`, `yellow`, `magenta`, ...

## Config

Here is a simple example:

```js
const lepi = require('../index')

lepi.title('Test', 'magenta')

lepi.command('test',(args, done)=>{
  lepi.log('running http request...')
  setTimeout(()=>{
    lepi.log('completed','green')
    done()
  }, 2000)
})
```

## Command Line

```console
$ lepi -c ./lepiconfig.js
```

## License

MIT