import { Transaction, User } from "../models";
// import { knex } from "../config/database";
import { Knex } from "knex";
import knexConfig from "../../knexfile";


export class WalletService {
	private knexInstance: Knex;

	constructor(environment: string) {
		// Use the environment-specific configuration
		this.knexInstance = require("knex")(knexConfig[environment]);
	}

	async createAccount(
		username: string,
		initialBalance: number
	): Promise<User> {
		const user: User = {
			userId: 0, // Assuming userId is auto-incremented by the database
			username,
			balance: initialBalance,
		};

		// Insert user into the database
		const [userId] = await this.knexInstance("users").insert(user);

		return { ...user, userId };
	}

	async fundAccount(userId: number, amount: number): Promise<number> {
		// Update user balance in the database
		await this.knexInstance("users")
			.where("userId", userId)
			.increment("balance", amount);

		// Retrieve updated balance
		const { balance } = await this.knexInstance("users")
			.select("balance")
			.where("userId", userId)
			.first();

		return balance;
	}

	async transferFunds(
		senderId: number,
		receiverId: number,
		amount: number
	): Promise<Transaction> {
		// Ensure sender has sufficient funds
		const senderBalance = await this.knexInstance("users")
			.select("balance")
			.where("userId", senderId)
			.first();
		if (!senderBalance || senderBalance.balance < amount) {
			throw new Error("Insufficient funds for the transfer");
		}

		// Start a database transaction
		const trx = await this.knexInstance.transaction();

		try {
			// Deduct funds from the sender
			await trx("users")
				.where("userId", senderId)
				.decrement("balance", amount);

			// Add funds to the receiver
			await trx("users")
				.where("userId", receiverId)
				.increment("balance", amount);

			// Record the transaction
			const transaction: Transaction = {
				senderId,
				receiverId,
				amount,
				timestamp: new Date().toISOString(),
			};

			await trx("transactions").insert(transaction);

			// Commit the transaction
			await trx.commit();

			return transaction;
		} catch (error) {
			// Rollback the transaction if any error occurs
			await trx.rollback();
			throw error;
		}
	}

	async withdrawFunds(userId: number, amount: number): Promise<number> {
		// Ensure user has sufficient funds
		const userBalance = await this.knexInstance("users")
			.select("balance")
			.where("userId", userId)
			.first();
		if (!userBalance || userBalance.balance < amount) {
			throw new Error("Insufficient funds for the withdrawal");
		}

		// Update user balance in the database
		await this.knexInstance("users")
			.where("userId", userId)
			.decrement("balance", amount);

		// Retrieve updated balance
		const { balance } = await this.knexInstance("users")
			.select("balance")
			.where("userId", userId)
			.first();

		return balance;
	}
}
