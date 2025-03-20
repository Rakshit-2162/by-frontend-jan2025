// Account class definition with types
var Account = /** @class */ (function () {
    function Account(id, name, type, balance) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.balance = balance;
    }
    return Account;
}());
// AccountManager class with CRUD operations and stats
var AccountManager = /** @class */ (function () {
    function AccountManager() {
        this.accounts = new Map();
        this.nextId = 1;
    }
    // Add new account
    AccountManager.prototype.addAccount = function (name, type, balance) {
        var id = this.nextId++;
        var account = new Account(id, name, type, balance);
        this.accounts.set(account.id, account);
        console.log("Account added: ".concat(JSON.stringify(account)));
    };
    // List all accounts
    AccountManager.prototype.listAccounts = function () {
        console.log("\nList of Accounts:");
        this.accounts.forEach(function (account) { return console.log(JSON.stringify(account)); });
    };
    // View specific account by ID
    AccountManager.prototype.viewAccount = function (id) {
        var account = this.accounts.get(id);
        if (account) {
            console.log("\nAccount Details: ".concat(JSON.stringify(account)));
        }
        else {
            console.log("\nAccount with ID ".concat(id, " not found."));
        }
    };
    // Update account details
    AccountManager.prototype.updateAccount = function (id, name, type, balance) {
        var account = this.accounts.get(id);
        if (account) {
            account.name = name !== undefined ? name : account.name;
            account.type = type !== undefined ? type : account.type;
            account.balance = balance !== undefined ? balance : account.balance;
            console.log("\nAccount updated: ".concat(JSON.stringify(account)));
        }
        else {
            console.log("\nAccount with ID ".concat(id, " not found."));
        }
    };
    // Delete account by ID
    AccountManager.prototype.deleteAccount = function (id) {
        if (this.accounts.has(id)) {
            var removed = this.accounts.get(id);
            this.accounts.delete(id);
            console.log("\nAccount deleted: ".concat(JSON.stringify(removed)));
        }
        else {
            console.log("\nAccount with ID ".concat(id, " not found."));
        }
    };
    // Stats: Number of accounts by type
    AccountManager.prototype.numberOfAccountsByType = function () {
        var stats = {};
        for (var _i = 0, _a = this.accounts.values(); _i < _a.length; _i++) {
            var acc = _a[_i];
            stats[acc.type] = (stats[acc.type] || 0) + 1;
        }
        console.log("\nNumber of Accounts by Type:");
        console.log(stats);
    };
    // Stats: Total balance by type
    AccountManager.prototype.totalBalanceByType = function () {
        var balanceStats = {};
        for (var _i = 0, _a = this.accounts.values(); _i < _a.length; _i++) {
            var acc = _a[_i];
            balanceStats[acc.type] = (balanceStats[acc.type] || 0) + acc.balance;
        }
        console.log("\nTotal Balance by Type:");
        console.log(balanceStats);
    };
    // Stats: Top 3 accounts with highest balance
    AccountManager.prototype.topThreeAccountsByBalance = function () {
        var sortedAccounts = Array.from(this.accounts.values())
            .sort(function (a, b) { return b.balance - a.balance; })
            .slice(0, 3);
        console.log("\nTop 3 Accounts with Highest Balance:");
        sortedAccounts.forEach(function (acc) { return console.log(JSON.stringify(acc)); });
    };
    return AccountManager;
}());
// Sample usage
var manager = new AccountManager();
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
