import { config } from "dotenv";
config(); // Load environment variables from .env file

import type { Knex } from "knex";

const knexConfig: { [key: string]: Knex.Config } = {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./dev.sqlite3",
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./migrations",
		},
	},

	staging: {
		client: "mysql",
		connection: {
			host: process.env.DB_HOST || "localhost",
			port: Number(process.env.DB_PORT) || 3306,
			user: process.env.DB_USER || "root",
			password: process.env.DB_PASSWORD || "",
			database: process.env.DB_NAME || "mvp_credit_wallet_service",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./migrations",
		},
	},

	production: {
		client: "mysql",
		connection: {
			host: process.env.DB_HOST || "localhost",
			port: Number(process.env.DB_PORT) || 3306,
			user: process.env.DB_USER || "root",
			password: process.env.DB_PASSWORD || "",
			database: process.env.DB_NAME || "mvp_credit_wallet_service",
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: "knex_migrations",
			directory: "./migrations",
		},
	},
};

// module.exports = knexConfig;
export default knexConfig;
