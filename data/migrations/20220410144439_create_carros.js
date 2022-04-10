exports.up = function (knex) {
    return knex.schema.createTable("carros", (table) => {
        table.increments();
        table.string("modelo", 60).notNullable();
        table.string("marca", 60).notNullable();
        table.integer("ano", 4).notNullable();
        table.decimal("preco", 9.2).notNullable();
        table.integer("revendedor_id").notNullable().unsigned();
        table.foreign("revendedor_id").references("revendedores.id")
             .onDelete("restrict").onUpdate("cascade");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("carros");
};

