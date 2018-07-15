const lepi = require('../index')

lepi.title('Test', 'magenta')

lepi.command('test',(args, done)=>{
  lepi.log('running http request...')
  setTimeout(()=>{
    lepi.log('completed','green')
    done()
  }, 2000)
})
