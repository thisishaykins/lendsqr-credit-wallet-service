import Knex from "knex";
import knexConfig from "../../knexfile";


export const knex = Knex({
	client: "mysql",
	connection: {
		host: process.env.DB_HOST || "localhost",
		port: Number(process.env.DB_PORT) || 3306,
		user: process.env.DB_USER || "root",
		password: process.env.DB_PASSWORD || "",
		database: process.env.DB_NAME || "mvp_credit_wallet_service",
	},
	migrations: {
		tableName: "knex_migrations",
		directory: "./migrations",
	},
});
