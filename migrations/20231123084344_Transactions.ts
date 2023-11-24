import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("transactions", function (table) {
		table.bigInteger("senderId");
		table.bigInteger("receiverId");
		table.decimal("amount").notNullable();
    // table.timestamps();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
	});
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
      .dropTable("transactions");
}

