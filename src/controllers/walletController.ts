import { Request, Response } from "express";
import { WalletService } from "../services/walletService";

const app_env = process.env.APP_ENV || "root";
const walletService = new WalletService(app_env);

export const createAccount = (req: Request, res: Response) => {
	const { username, initialBalance } = req.body;
	if (!username) {
		console.log("walletController->username", username);
		throw new Error("Name is required!");
	}
	try {
		const account = walletService.createAccount(username, initialBalance);
		res.json(account);
	} catch (error) {
		console.log("walletController", error);
		res.json(error)
	}
	
};

export const fundAccount = (req: Request, res: Response) => {
	const userId = parseInt(req.params.userId, 10);
	const { amount } = req.body;
	const balance = walletService.fundAccount(userId, amount);
	res.json({ userId, balance });
};

export const transferFunds = (req: Request, res: Response) => {
	const { senderId, receiverId, amount } = req.body;
	const transaction = walletService.transferFunds(
		senderId,
		receiverId,
		amount
	);
	res.json(transaction);
};

export const withdrawFunds = (req: Request, res: Response) => {
	const userId = parseInt(req.params.userId, 10);
	const { amount } = req.body;
	const balance = walletService.withdrawFunds(userId, amount);
	res.json({ userId, balance });
};
