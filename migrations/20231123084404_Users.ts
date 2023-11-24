import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
		.createTable("users", function (table) {
			table.increments("userId");
			table.string("username", 100).notNullable();
			table.decimal("balance").notNullable();
            // table.timestamps();
			table.timestamp("created_at").defaultTo(knex.fn.now());
			table.timestamp("updated_at").defaultTo(knex.fn.now());
		})
		.createTable("products", function (table) {
			table.increments("id");
			table.decimal("price").notNullable();
			table.string("name", 1000).notNullable();
            // table.timestamps();
			table.timestamp("created_at").defaultTo(knex.fn.now());
			table.timestamp("updated_at").defaultTo(knex.fn.now());
		});
};


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("products").dropTable("users");
};

exports.config = { transaction: false };
