const queryScripts = require('./query_script')


var args = process.argv.slice(2,)
var values = args[2]

queryScripts.famousPeople (args, (err, result) => {
  var num = 0
    console.log(`Found ${result.rows.length} persons by the name of ${values}:`)
    for (row of result.rows) {
        num += 1
        var output = `- ${num} ${row.first_name} ${row.last_name} born ${JSON.stringify(row.birthdate).slice(1,11)}`
        console.log(output)
    }
})
