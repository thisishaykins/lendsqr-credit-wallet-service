// tests/walletService.test.ts
import { WalletService } from "../src/services/walletService";

describe("WalletService", () => {
	let walletService: WalletService;

	beforeAll(() => {
		// Initialize WalletService before running tests
		walletService = new WalletService();
	});

	describe("createAccount", () => {
		it("should create an account with the given username and initial balance", () => {
			const user = walletService.createAccount("testUser", 500);
			expect(user).toHaveProperty("userId");
			expect(user.username).toBe("testUser");
			expect(user.balance).toBe(500);
		});
	});

	describe("fundAccount", () => {
		it("should add funds to the user account", async () => {
			const initialBalance = 100;
			const user = walletService.createAccount(
				"userWithFunds",
				initialBalance
			);

			const updatedBalance = await walletService.fundAccount(
				user.userId,
				200
			);
			expect(updatedBalance).toBe(initialBalance + 200);
		});

		it("should throw an error if the user does not exist", async () => {
			await expect(
				walletService.fundAccount(999, 100)
			).rejects.toThrowError("User not found");
		});
	});

	describe("transferFunds", () => {
		it("should transfer funds between two users", async () => {
			const sender = walletService.createAccount("sender", 500);
			const receiver = walletService.createAccount("receiver", 200);

			const transaction = await walletService.transferFunds(
				sender.userId,
				receiver.userId,
				100
			);

			expect(transaction.senderId).toBe(sender.userId);
			expect(transaction.receiverId).toBe(receiver.userId);
			expect(transaction.amount).toBe(100);
		});

		it("should throw an error if the sender has insufficient funds", async () => {
			const sender = walletService.createAccount(
				"senderWithInsufficientFunds",
				50
			);
			const receiver = walletService.createAccount(
				"receiverForError",
				100
			);

			await expect(
				walletService.transferFunds(sender.userId, receiver.userId, 100)
			).rejects.toThrowError("Insufficient funds for the transfer");
		});

		it("should throw an error if the sender or receiver does not exist", async () => {
			await expect(
				walletService.transferFunds(999, 1, 50)
			).rejects.toThrowError("Sender not found");
			await expect(
				walletService.transferFunds(1, 999, 50)
			).rejects.toThrowError("Receiver not found");
		});
	});

	describe("withdrawFunds", () => {
		it("should withdraw funds from the user account", async () => {
			const initialBalance = 200;
			const user = walletService.createAccount(
				"userForWithdrawal",
				initialBalance
			);

			const updatedBalance = await walletService.withdrawFunds(
				user.userId,
				50
			);
			expect(updatedBalance).toBe(initialBalance - 50);
		});

		it("should throw an error if the user has insufficient funds", async () => {
			const user = walletService.createAccount(
				"userWithInsufficientFunds",
				20
			);
			await expect(
				walletService.withdrawFunds(user.userId, 50)
			).rejects.toThrowError("Insufficient funds for the withdrawal");
		});

		it("should throw an error if the user does not exist", async () => {
			await expect(
				walletService.withdrawFunds(999, 50)
			).rejects.toThrowError("User not found");
		});
	});
});
