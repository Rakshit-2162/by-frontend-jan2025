// create account manager program to perfornm CRUD operations

// - add account
// - list accounts
// - view account
// - update account
// - delete account

// print stats
// - no of accounts by type
// - total balance by type
// - top 3 account having more balance

class Account {
    constructor(id, name, type, balance) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.balance = balance;
    }
}

class AccountManager {
    constructor() {
        this.accounts = new Map();
        this.nextId = 1;
    }

    addAccount(name, type, balance) {
        const id = this.nextId++;
        const account = new Account(id, name, type, balance);
        this.accounts.set(account.id, account);
        console.log(`Account added: ${JSON.stringify(account)}`);
    }

    listAccounts() {
        console.log("\nList of Accounts:");
        this.accounts.forEach(account => console.log(JSON.stringify(account)));
    }

    viewAccount(id) {
        const account = this.accounts.get(id);
        if (account) {
            console.log(`\nAccount Details: ${JSON.stringify(account)}`);
        } else {
            console.log(`\nAccount with ID ${id} not found.`);
        }
    }

    updateAccount(id, name, type, balance) {
        const account = this.accounts.get(id);
        if (account) {
            account.name = name !== undefined ? name : account.name;
            account.type = type !== undefined ? type : account.type;
            account.balance = balance !== undefined ? balance : account.balance;
            console.log(`\nAccount updated: ${JSON.stringify(account)}`);
        } else {
            console.log(`\nAccount with ID ${id} not found.`);
        }
    }

    deleteAccount(id) {
        if (this.accounts.has(id)) {
            const removed = this.accounts.get(id);
            this.accounts.delete(id);
            console.log(`\nAccount deleted: ${JSON.stringify(removed)}`);
        } else {
            console.log(`\nAccount with ID ${id} not found.`);
        }
    }

    numberOfAccountsByType() {
        const stats = {};
        for (let acc of this.accounts.values()) {
            stats[acc.type] = (stats[acc.type] || 0) + 1;
        }
        console.log("\nNumber of Accounts by Type:");
        console.log(stats);
    }

    totalBalanceByType() {
        const balanceStats = {};
        for (let acc of this.accounts.values()) {
            balanceStats[acc.type] = (balanceStats[acc.type] || 0) + acc.balance;
        }
        console.log("\nTotal Balance by Type:");
        console.log(balanceStats);
    }

    topThreeAccountsByBalance() {
        const sortedAccounts = Array.from(this.accounts.values())
            .sort((a, b) => b.balance - a.balance)
            .slice(0, 3);
        console.log("\nTop 3 Accounts with Highest Balance:");
        sortedAccounts.forEach(acc => console.log(acc));
    }
}

const manager = new AccountManager();

manager.addAccount("Raksiht", "Savings", 5000);
manager.addAccount("Jishnu", "Current", 2000);
manager.addAccount("Shrikant", "Savings", 8000);
manager.addAccount("Vidit", "Loan", 15000);
manager.addAccount("Rajat", "Current", 7000);

manager.listAccounts();

manager.viewAccount(3);

manager.updateAccount(2, "Ruchir", "Current", 3000);

manager.deleteAccount(3);

// Print stats
manager.numberOfAccountsByType();
manager.totalBalanceByType();
manager.topThreeAccountsByBalance();
