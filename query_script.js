const pg = require("pg");
const settings = require("./settings"); // settings.json

const args = process.argv.slice(2,)

const text  = `SELECT id, first_name, last_name, birthdate FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text`
const values = args[0]

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(text, args,  (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    var num = 0
    console.log(`Found ${result.rows.length} persons by the name of ${values}:`)
    for (row of result.rows) {
      num += 1
      var output = `- ${num} ${row.first_name} ${row.last_name} born ${JSON.stringify(row.birthdate).slice(1,11)}`
      console.log(output)
    }

    client.end();
  });
});


