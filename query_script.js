const pg = require("pg");
const settings = require("./settings"); // settings.json

var args2 = process.argv.slice(2,)

const text  = `SELECT id, first_name, last_name, birthdate FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text`
const values = args2[0]


module.exports = (function() {

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
})
  function famousPeople (textArray, callback) {
    const text  = `SELECT id, first_name, last_name, birthdate FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text`
    //const values = args[0]
    client.query(text, textArray, (err, result) => {
      if (err) {
        return console.log("error running query", err);
      }
      callback(err, result)
    })
  }
  return {
    famousPeople: famousPeople
  }
})()




