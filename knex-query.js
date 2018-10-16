
const settings = require("./settings"); // settings.json
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





const text  = `SELECT id, first_name, last_name, birthdate FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text`

var args = process.argv.slice(2,)
const values = args[0]



function gettingFamous (textString, callback) {
  knex.select('*').from('famous_people')
  .where('first_name', 'LIKE', textString[0])
  .orWhere('last_name', 'LIKE', textString[0])
  .asCallback(function(err, rows) {
    if (err) {
      return console.error(err);
    }
    console.log("In function", rows)
    callback(err, rows)
  })
}


console.log("ARGS:", args)
gettingFamous(args, (err, result) => {
  if (err) {
    console.log(error)
  }
  console.log("returned:", result)
})


//client.connect((err) => {
//  if (err) {
//    return console.error("Connection Error", err);
//  }
//  client.query(text, args,  (err, result) => {
//    if (err) {
//      return console.error("error running query", err);
//    }
//    var num = 0
//    console.log(`Found ${result.rows.length} persons by the name of ${values}:`)
//    for (row of result.rows) {
//      num += 1
//      var output = `- ${num} ${row.first_name} ${row.last_name} born ${JSON.stringify(row.birthdate).slice(1,11)}`
//      console.log(output)
//
//    }
//    console.log(result.rows)
//    client.end();
//  });
//});


