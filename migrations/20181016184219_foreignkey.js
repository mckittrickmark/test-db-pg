
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function(table) {
      table.string('location');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function(table) {
      table.dropColumn('location');
    })
  ])
};
