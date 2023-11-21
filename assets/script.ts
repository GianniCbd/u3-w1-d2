//
// 1 inizio con la creazione di account figlio
// 2 creo metodi deposito prelievo e bilancio
// 3 creo account madre con interessi
// 4 creo funzione random per deposito e ritiro
//

// creazione account figlio
class accountS {
  name: string;
  surname: string;
  public balance: number;

  constructor(_name: string, _surname: string) {
    this.balance = 0;
    this.name = "Mario";
    this.surname = "Piano";
  }
  // creo metodo per il primo deposito
  oneDeposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(
        `${this.name} ${this.surname} ha effettuato un deposito di ${amount}€. Nuovo bilancio: ${this.balance}€`
      );
    } else {
      console.log("Deposito non valido");
    }
  }

  // creo metodo per il primo ritiro
  oneWithdraw(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      console.log(`${this.name} ${this.surname} ha effettuato un prelievo ${amount}€. Nuovo bilancio ${this.balance}€`);
    } else {
      console.log("Ritiro non valido");
    }
  }

  // ottengo il bilancio
  getBalance(): number {
    return this.balance;
  }
}

// account madre con extends

class accountM extends accountS {
  constructor(name: string, surname: string) {
    super(name, surname);
    this.name = "Maria";
    this.surname = "Forte";
  }
  // aggiungo interessi
  addInterest(): void {
    const interest = this.getBalance() * 0.1;
    console.log(`Interessi per ${interest}€. Nuovo Bilancio ${this.getBalance()}€`);
    this.oneDeposit(interest);
  }
}

// trattenuta bancaria

class accountWithFee extends accountS {
  withdrawFee: number;

  constructor(_name: string, _surname: string, withdrawFee: number) {
    super(_name, _surname);
    this.withdrawFee = withdrawFee;
  }

  withdrawWithFee(amount: number): void {
    if (amount > 0 && amount <= this.balance) {
      const amountWithFee = amount + this.withdrawFee;
      this.balance -= amountWithFee;
      console.log(
        `${this.name} ${this.surname} ha effettuato un prelievo di ${amount} con trattenuto di ${this.withdrawFee}€. Nuovo Bilancio ${this.balance}$`
      );
    } else {
      console.log("errore");
    }
  }
}

// -----------
const accountMarioFee = new accountWithFee("Mario", "Piano", 5);
accountMarioFee.oneDeposit(generateRandomAmount(20, 200));
accountMarioFee.withdrawWithFee(generateRandomAmount(20, 50));
// const accountMario = new accountS("Mario", "Piano");

// genero cifre casuali sia per deposito che ritiro
// accountMario.oneDeposit(generateRandomAmount(20, 200));
// accountMario.oneWithdraw(generateRandomAmount(20, 50));

const accountMaria = new accountM("Maria", "Forte");
accountMaria.oneDeposit(generateRandomAmount(100, 400));
accountMaria.oneWithdraw(generateRandomAmount(40, 150));
accountMaria.addInterest();

function generateRandomAmount(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// --------------------------------------------------------->

// div collegato al body
const balanceContainer = document.createElement("div");
balanceContainer.classList.add("balanceContainer");
balanceContainer.innerHTML = `
  <p>Saldo ${accountMarioFee.name} : <span> ${accountMarioFee.getBalance()} </span> </p>
  <p>Saldo ${accountMaria.name}: <span> ${accountMaria.getBalance()} </span> </p>
`;

document.body.appendChild(balanceContainer);
