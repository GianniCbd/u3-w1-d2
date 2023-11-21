//
// 1 inizio con la creazione di account figlio
// 2 creo metodi deposito prelievo e bilancio
// 3 creo account madre con interessi
// 4 creo funzione random per deposito e ritiro
//
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// creazione account figlio
var accountS = /** @class */ (function () {
    function accountS(_name, _surname) {
        this.balance = 0;
        this.name = "Mario";
        this.surname = "Piano";
    }
    // creo metodo per il primo deposito
    accountS.prototype.oneDeposit = function (amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log("".concat(this.name, " ").concat(this.surname, " ha effettuato un deposito di ").concat(amount, "\u20AC. Nuovo bilancio: ").concat(this.balance, "\u20AC"));
        }
        else {
            console.log("Deposito non valido");
        }
    };
    // creo metodo per il primo ritiro
    accountS.prototype.oneWithdraw = function (amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log("".concat(this.name, " ").concat(this.surname, " ha effettuato un prelievo ").concat(amount, "\u20AC. Nuovo bilancio ").concat(this.balance, "\u20AC"));
        }
        else {
            console.log("Ritiro non valido");
        }
    };
    // ottengo il bilancio
    accountS.prototype.getBalance = function () {
        return this.balance;
    };
    return accountS;
}());
// account madre con extends
var accountM = /** @class */ (function (_super) {
    __extends(accountM, _super);
    function accountM(name, surname) {
        var _this = _super.call(this, name, surname) || this;
        _this.name = "Maria";
        _this.surname = "Forte";
        return _this;
    }
    // aggiungo interessi
    accountM.prototype.addInterest = function () {
        var interest = this.getBalance() * 0.1;
        console.log("Interessi per ".concat(interest, "\u20AC. Nuovo Bilancio ").concat(this.getBalance(), "\u20AC"));
        this.oneDeposit(interest);
    };
    return accountM;
}(accountS));
// trattenuta bancaria
var accountWithFee = /** @class */ (function (_super) {
    __extends(accountWithFee, _super);
    function accountWithFee(_name, _surname, withdrawFee) {
        var _this = _super.call(this, _name, _surname) || this;
        _this.withdrawFee = withdrawFee;
        return _this;
    }
    accountWithFee.prototype.withdrawWithFee = function (amount) {
        if (amount > 0 && amount <= this.balance) {
            var amountWithFee = amount + this.withdrawFee;
            this.balance -= amountWithFee;
            console.log("".concat(this.name, " ").concat(this.surname, " ha effettuato un prelievo di ").concat(amount, " con trattenuto di ").concat(this.withdrawFee, "\u20AC. Nuovo Bilancio ").concat(this.balance, "$"));
        }
        else {
            console.log("errore");
        }
    };
    return accountWithFee;
}(accountS));
// -----------
var accountMarioFee = new accountWithFee("Mario", "Piano", 5);
accountMarioFee.oneDeposit(generateRandomAmount(20, 200));
accountMarioFee.withdrawWithFee(generateRandomAmount(20, 50));
// const accountMario = new accountS("Mario", "Piano");
// genero cifre casuali sia per deposito che ritiro
// accountMario.oneDeposit(generateRandomAmount(20, 200));
// accountMario.oneWithdraw(generateRandomAmount(20, 50));
var accountMaria = new accountM("Maria", "Forte");
accountMaria.oneDeposit(generateRandomAmount(100, 400));
accountMaria.oneWithdraw(generateRandomAmount(40, 150));
accountMaria.addInterest();
function generateRandomAmount(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// --------------------------------------------------------->
// div collegato al body
var balanceContainer = document.createElement("div");
balanceContainer.classList.add("balanceContainer");
balanceContainer.innerHTML = "\n  <p>Saldo ".concat(accountMarioFee.name, " : <span> ").concat(accountMarioFee.getBalance(), " </span> </p>\n  <p>Saldo ").concat(accountMaria.name, ": <span> ").concat(accountMaria.getBalance(), " </span> </p>\n");
document.body.appendChild(balanceContainer);
