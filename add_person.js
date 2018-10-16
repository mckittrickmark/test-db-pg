const settings = require("./settings"); // settings.json
//const knexQ1 = require('./knex-query')

const knex = require('knex')({
      client: 'pg',
      connection: {
          user: settings.user,
          password: settings.password,
          database: settings.database,
          host: settings.hostname,
          port: settings.port,
          ssl: settings.ssl
      }
})

const args = process.argv.slice(2,)


function addPerson (inputArray) {
  console.log("Input Array:", inputArray)
  knex('famous_people')
  .insert({
    first_name: inputArray[0],
    last_name: inputArray[1],
    birthdate: inputArray[2]
  })
  .finally(() => {
    knex.destroy()
  });

}

addPerson(args)