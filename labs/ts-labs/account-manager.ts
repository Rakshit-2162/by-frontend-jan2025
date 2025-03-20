// Account class definition with private members and accessors
class Account {
    private id: number;
    private name: string;
    private type: string;
    private balance: number;

    // Private constructor
    private constructor(id: number, name: string, type: string, balance: number) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.balance = balance;
    }

    // Static factory method to create an account
    public static create(id: number, name: string, type: string, balance: number): Account {
        return new Account(id, name, type, balance);
    }

    // Getters (read-only access)
    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getType(): string {
        return this.type;
    }

    public getBalance(): number {
        return this.balance;
    }

    // Setters (controlled updates)
    public setName(name: string): void {
        this.name = name;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public setBalance(balance: number): void {
        this.balance = balance;
    }

    // To print account as string
    public toString(): string {
        return JSON.stringify({
            id: this.id,
            name: this.name,
            type: this.type,
            balance: this.balance
        });
    }
}

// AccountManager class
class AccountManager {
    private accounts: Map<number, Account>;
    private nextId: number;

    constructor() {
        this.accounts = new Map<number, Account>();
        this.nextId = 1;
    }

    // Add new account using factory method
    addAccount(name: string, type: string, balance: number): void {
        const id = this.nextId++;
        const account = Account.create(id, name, type, balance);
        this.accounts.set(id, account);
        console.log(`Account added: ${account.toString()}`);
    }

    // List all accounts
    listAccounts(): void {
        console.log("\nList of Accounts:");
        this.accounts.forEach(account => console.log(account.toString()));
    }

    // View specific account by ID
    viewAccount(id: number): void {
        const account = this.accounts.get(id);
        if (account) {
            console.log(`\nAccount Details: ${account.toString()}`);
        } else {
            console.log(`\nAccount with ID ${id} not found.`);
        }
    }

    // Update account details using setters
    updateAccount(id: number, name?: string, type?: string, balance?: number): void {
        const account = this.accounts.get(id);
        if (account) {
            if (name !== undefined) account.setName(name);
            if (type !== undefined) account.setType(type);
            if (balance !== undefined) account.setBalance(balance);
            console.log(`\nAccount updated: ${account.toString()}`);
        } else {
            console.log(`\nAccount with ID ${id} not found.`);
        }
    }

    // Delete account by ID
    deleteAccount(id: number): void {
        if (this.accounts.has(id)) {
            const removed = this.accounts.get(id);
            this.accounts.delete(id);
            console.log(`\nAccount deleted: ${removed?.toString()}`);
        } else {
            console.log(`\nAccount with ID ${id} not found.`);
        }
    }

    // Stats: Number of accounts by type
    numberOfAccountsByType(): void {
        const stats: Record<string, number> = {};
        for (let acc of this.accounts.values()) {
            const type = acc.getType();
            stats[type] = (stats[type] || 0) + 1;
        }
        console.log("\nNumber of Accounts by Type:");
        console.log(stats);
    }

    // Stats: Total balance by type
    totalBalanceByType(): void {
        const balanceStats: Record<string, number> = {};
        for (let acc of this.accounts.values()) {
            const type = acc.getType();
            balanceStats[type] = (balanceStats[type] || 0) + acc.getBalance();
        }
        console.log("\nTotal Balance by Type:");
        console.log(balanceStats);
    }

    // Stats: Top 3 accounts with highest balance
    topThreeAccountsByBalance(): void {
        const sortedAccounts = Array.from(this.accounts.values())
            .sort((a, b) => b.getBalance() - a.getBalance())
            .slice(0, 3);
        console.log("\nTop 3 Accounts with Highest Balance:");
        sortedAccounts.forEach(acc => console.log(acc.toString()));
    }
}

// ✅ Sample Usage
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
