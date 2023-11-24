# LendSQR Credit Wallet Service

This project provides a simple Node.js application that implements a basic credit wallet service. The service allows users to register, fund their accounts, transfer funds to other users, and withdraw funds.

## Installation

To install the dependencies and run the application, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/thisishaykins/lendsqr-credit-wallet-service.git
```

2. Navigate to the project directory:

```bash
cd lendsqr-credit-wallet-service
```

3. Install the dependencies:

```bash
npm install
```

4. Create a `.env` file to store your database connection details:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=demo_credit_wallet
```

5.1 Run the application (using local SQLITE DB):

```bash
npm run start:dev
```

5.2 Run the application (using local MySQL DB):

```bash
npm run start:stage
```

The application will start listening on port 3500 or configured (in env) by default.

5.3 Build and Run application in the staging environment (using local MySQL DB):

```bash
npm run start:staging
```

5.4 Build and Run application in the production environment (using local MySQL DB):

```bash
npm run start
```

## Usage

The application provides the following endpoints:

- `/api/register`: Register a new user
- `/api/login`: Login an existing user
- `/api/account`: create a new user account
- `/api/fund/:accountId`: Fund an account
- `/api/transfer/`: Transfer funds from one account to another
- `/api/withdraw/:accountId`: Withdraw funds from an account

### Registering a User

To register a new user, send a POST request to the `/register` endpoint with the following JSON body:

```json
{
  "username": "johndoe",
  "email": "johndoe@example.com"
}
```

### Logging In

To log in an existing user, send a POST request to the `/login` endpoint with the following JSON body:

```json
{
  "username": "johndoe",
  "password": "password"
}
```

### Account

To create an account user, send a POST request to the `/account` endpoint with the following JSON body:

```json
{
  "username": "johndoe",
  "initialBalance": 8933.81
}
```

### Funding an Account

To fund an account, send a POST request to the `/fund/:accountId` endpoint with the following JSON body:

```json
{
  "amount": 100
}
```

Replace `:accountId` with the ID of the account you want to fund.

### Transferring Funds

To transfer funds from one account to another, send a POST request to the `/transfer/:sourceAccountId` endpoint with the following JSON body:

```json
{
  "destinationAccountId": 2,
  "amount": 50
}
```

Replace `:sourceAccountId` with the ID of the source account and `2` with the ID of the destination account.

### Withdrawing Funds

To withdraw funds from an account, send a POST request to the `/withdraw/:accountId` endpoint with the following JSON body:

```json
{
  "amount": 50
}
```

Replace `:accountId` with the ID of the account you want to withdraw funds from.

## Testing

To run the tests, execute the following command:

```bash
npm test
```

## Support

This is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](mailto:akinsholasamuel@gmail.com).

## Stay in touch

- Author - [Akinshola Samuel AKINDE](https://linkedin.com/in/akinshola)
- Website - [https://akinshola.com](https://akinshola.com/)
- Twitter - [@thisishaykins](https://twitter.com/thisishaykins)
- GitHub - [@thisishaykins](https://github.com/thisishaykins)

## License

This Project is [MIT licensed](LICENSE).
