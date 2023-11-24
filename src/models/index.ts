// models/index.ts
export interface User {
	userId: number;
	username: string;
	balance: number;
}

export interface Transaction {
	senderId: number;
	receiverId: number;
	amount: number;
	timestamp: string;
}
