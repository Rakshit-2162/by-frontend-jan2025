class Account {
    constructor(id, name, type, balance) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.balance = balance;
    }

    withdraw(id, amount) {
        if (amount > this.balance) {
            console.log("\nInsuffecient Amount!");
        } else {
            this.balance -= amount;
            console.log(`\nWithdrew $${amount} Successfully!\nNew Balance: $${this.balance.toFixed(2)}`)
        }
    }

    deposite(id, amount) {
        if (amount <= 0) {
            console.log("\nDeposit amount must be greater than zero");
        } else {
            this.balance += amount;
            console.log(`\nDeposited $${amount} successfully! \nNew balance: $${this.balance.toFixed(2)}`);
        }
    }

    getDetails(id) {
        if (this.id !== id) {
            console.log("\nInvalid Account ID");
            return;
        }
        console.log(`\nAccount Details:\nID: ${this.id}\nName: ${this.name}\nType: ${this.type}\nBalance: $${this.balance.toFixed(2)}`);
    }
}

let obj = new Account(1, "Rakshit", "Saving", 5000);

obj.getDetails(1);
obj.deposite(1, 2000);
obj.getDetails(1);
obj.withdraw(1, 3000);
obj.getDetails(1);