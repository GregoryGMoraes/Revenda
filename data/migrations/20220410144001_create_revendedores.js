exports.up = function (knex) {
    return knex.schema.createTable("revendedores", (table) => {
        table.increments();
        table.string("nome", 60).notNullable();
        table.string("contato", 40).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("revendedores");
};
