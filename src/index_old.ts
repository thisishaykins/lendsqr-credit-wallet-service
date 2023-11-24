// index.ts
import express from "express";
import bodyParser from "body-parser";
import {
	createAccount,
	fundAccount,
	transferFunds,
	withdrawFunds,
} from "./controllers/walletController";

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create an account
app.post("/api/account", createAccount);

// Fund account
app.post("/api/fund/:userId", fundAccount);

// Transfer funds
app.post("/api/transfer", transferFunds);

// Withdraw funds
app.post("/api/withdraw/:userId", withdrawFunds);

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
