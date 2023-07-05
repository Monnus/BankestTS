'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
interface AccountUser {
  owner: string;
  movements: number[];
  interestRate: number;
  pin: number;
  inicialize(): string;
  sorted?:boolean;
}
const account1: AccountUser = {
  owner: 'Jonas Schmedtmann',
  // owner: 'JS',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  inicialize() {
    const splitName: string = this.owner
      .split(' ')
      .map(i => i[0])
      .join('');
    console.log(splitName);
    return splitName;
  },
  sorted:true
};

const account2: AccountUser = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  inicialize() {
    const splitName: string = this.owner
      .split(' ')
      .map(i => i[0])
      .join('');
    console.log(splitName);
    return splitName;
  },
  sorted:true
};

const account3: AccountUser = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  inicialize() {
    const splitName: string = this.owner
      .split(' ')
      .map(i => i[0])
      .join('');
    console.log(splitName);
    return splitName;
  },
  sorted:true
};

const account4: AccountUser = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  inicialize() {
    const splitName: string = this.owner
      .split(' ')
      .map(i => i[0])
      .join('');
    console.log(splitName);
    return splitName;
  },
  sorted:true
};

const accounts: AccountUser[] = [account1, account2, account3, account4];
let currantAccountFound: AccountUser;
// Elements
const labelWelcome = document.querySelector('.welcome') as HTMLParagraphElement;
const labelDate = document.querySelector('.date') as HTMLSpanElement;
const labelBalance = document.querySelector(
  '.balance__value'
) as HTMLParagraphElement;
const labelSumIn = document.querySelector(
  '.summary__value--in'
) as HTMLParagraphElement;
const labelSumOut = document.querySelector(
  '.summary__value--out'
) as HTMLParagraphElement;
const labelSumInterest = document.querySelector(
  '.summary__value--interest'
) as HTMLParagraphElement;
const labelTimer = document.querySelector('.timer') as HTMLSpanElement;

const containerApp = document.querySelector('.app') as HTMLDivElement;
const containerMovements = document.querySelector(
  '.movements'
) as HTMLDivElement;

const btnLogin = document.querySelector('.login__btn') as HTMLButtonElement;
const btnTransfer = document.querySelector(
  '.form__btn--transfer'
) as HTMLButtonElement;
const btnLoan = document.querySelector('.form__btn--loan') as HTMLButtonElement;
const btnClose = document.querySelector(
  '.form__btn--close'
) as HTMLButtonElement;
const btnSort = document.querySelector('.btn--sort') as HTMLButtonElement;
const btnLoanBtn=document.querySelector(".form__btn--loan") as HTMLButtonElement;
const inputLoginUsername = document.querySelector(
  '.login__input--user'
) as HTMLInputElement;
const inputLoginPin = document.querySelector(
  '.login__input--pin'
) as HTMLInputElement;
const inputTransferTo = document.querySelector(
  '.form__input--to'
) as HTMLInputElement;
const inputTransferAmount = document.querySelector(
  '.form__input--amount'
) as HTMLInputElement;
const inputLoanAmount = document.querySelector(
  '.form__input--loan-amount'
) as HTMLInputElement;

const inputCloseUsername = document.querySelector(
  '.form__input--user'
) as HTMLInputElement;
const inputClosePin = document.querySelector(
  '.form__input--pin'
) as HTMLInputElement;

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
console.log('====================================');
console.log(currencies);
console.log('====================================');
const movements: number[] = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//
// display functions
let balanceTotal: number = 0;
let countdownTimer: ReturnType<typeof setTimeout>;

const displayBalance = (moneyIn: number, moneyOut: number): number => {
  balanceTotal = moneyOut + moneyIn;
  console.log('total', moneyOut + moneyIn);
  return moneyOut + moneyIn;
};
const summaryMovementValues = (accountInfo: AccountUser): void => {
  const { movements } = accountInfo;
  console.log(labelBalance.textContent as unknown as number);
  let moneyInCount: number = 0;
  let moneyOutCount: number = 0;
  movements.forEach(i => {
    if (i < 0) {
      moneyOutCount = moneyOutCount + i;
    } else {
      moneyInCount = moneyInCount + i;
    }
    labelSumIn.textContent = `${moneyInCount}€`;
    labelSumOut.textContent = `${+moneyOutCount}€`;
    labelSumInterest.textContent = `${accountInfo.interestRate}€`;
    //  console.log("moneyInCount",moneyInCount,"moneyOutCount",moneyOutCount);
  });
  console.log('displayBalance', displayBalance(moneyInCount, moneyOutCount));
  labelBalance.textContent = `${displayBalance(moneyInCount, moneyOutCount)}€`;
};
// date fn
function parseDate(dateString: string): Date | null {
  const [day, month, year] = dateString.split("/").map(Number);
  // Adjust month value since JavaScript Date object uses zero-based indexing for months
  const adjustedMonth = month - 1;
  // Create a new Date object using the provided day, month, and year values
  const parsedDate = new Date(year, adjustedMonth, day);
  // Check if the parsed date is valid
  const isValidDate = !isNaN(parsedDate.getTime());
  return isValidDate ? parsedDate : null;
}


const movementsDisplayFn = (accountInfo: AccountUser): void => {
  document.querySelector('.movements').textContent = ' ';
  const{movements:newMovementsArr}=accountInfo;
  const dateStr = "3/7/2023";
  const parsedDate = parseDate(dateStr);
  
  const formattedDate = parsedDate.toLocaleDateString("en-GB");
  if (parsedDate) {
    console.log(formattedDate); // Output: 05/07/2023
  } else {
    console.log("Invalid date format.");
  }

  if(accountInfo.sorted){
    newMovementsArr
    .sort((a, b) => a - b)
    .forEach(i => {
      const withdrawalOrDeposit: string = i > 0 ? 'deposit' : 'withdrawal';
      const htmlWithdrawal = `
    <div class="movements__row">
<div class="movements__type movements__type--${withdrawalOrDeposit}">
1 ${withdrawalOrDeposit}
</div>
<div class="movements__date">${formattedDate}</div>
<div class="movements__value">${i}€</div>
</div>`;
document
.querySelector('.movements')
.insertAdjacentHTML('afterbegin', htmlWithdrawal);
});
}else if(!accountInfo.sorted){
  newMovementsArr
    .sort((a, b) => a - b).reverse()
    .forEach(i => {
      const withdrawalOrDeposit: string = i > 0 ? 'deposit' : 'withdrawal';
      const htmlWithdrawal = `
    <div class="movements__row">
<div class="movements__type movements__type--${withdrawalOrDeposit}">
1 ${withdrawalOrDeposit}
</div>
<div class="movements__date">${formattedDate}</div>
<div class="movements__value">${i}€</div>
</div>`;
document
.querySelector('.movements')
.insertAdjacentHTML('afterbegin', htmlWithdrawal);
});
}
};

function startLogoutCountdown(): void {
  let countdownSeconds = 300; // 5 minutes in seconds
  // const formattedTime = `00:${seconds.toString().padStart(2, "0")}`;

  function updateTimer() {
    const minutes = Math.floor(countdownSeconds / 60);
    const seconds = countdownSeconds % 60;
    const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    labelTimer.textContent = formattedTime;

    if (countdownSeconds > 0) {
      countdownSeconds--;
    } else {
      clearInterval(countdownTimer);
      // Perform logout actions here
      labelWelcome.textContent='Log in to get started';
      containerApp.style.opacity = '0';
      inputCloseUsername.value=" "; 
      inputClosePin.value=" ";
      console.log("Logged out due to inactivity.");
    }
  };

  function resetTimer() {
    clearInterval(countdownTimer);
    countdownSeconds = 300; // Reset countdown to 5 minutes
    updateTimer();
    startTimer();
  };

  function startTimer() {
    countdownTimer = setInterval(updateTimer, 1000);
  };

  startTimer();

  // Reset timer on mouse movement or click events
  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("click", resetTimer);
};

//btn

btnLogin.addEventListener('click', e => {
  e.preventDefault();
  // if(!inputLoginUsername.value && !inputLoginPin.value) return;
  if (!inputLoginUsername.value) return;

  currantAccountFound = accounts.find(
    i =>
      i.inicialize().toLocaleLowerCase() ===
        inputLoginUsername.value.toLocaleLowerCase() &&
      i.pin === (+(inputLoginPin.value as unknown) as number)
  );
  labelWelcome.textContent = `Welcome back, ${
    currantAccountFound.owner.split(' ')[0]
  }`;
  movementsDisplayFn(currantAccountFound);
  summaryMovementValues(currantAccountFound);
  inputLoginUsername.value = '';
  inputLoginPin.value = '';
  containerApp.style.opacity = '1';

  console.log('====================================');
  console.log(
    currantAccountFound.movements,
    currantAccountFound.movements.sort((a: number, b: number) => a - b)
  );
  console.log('====================================');
startLogoutCountdown();

});

btnTransfer.addEventListener('click', (e): void => {
  e.preventDefault();
  if (!inputTransferTo.value || !inputTransferAmount.value) return;

  let findAccountUser: AccountUser = accounts.find(
    i =>
      i.inicialize().toLocaleLowerCase() ===
      inputTransferTo.value.toLocaleLowerCase()
  );
  if (findAccountUser.inicialize() === currantAccountFound.inicialize())
    return alert("You can't send money to yourself :-)");
  if ((+(inputTransferAmount.value as unknown) as number) > balanceTotal)
    return alert("You don't have enough funds for this transfer");
  currantAccountFound.movements.push(
    -(inputTransferAmount.value as unknown) as number
  );
  findAccountUser.movements.push(
    +(inputTransferAmount.value as unknown) as number
  );
  movementsDisplayFn(currantAccountFound);
  summaryMovementValues(currantAccountFound);
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  console.log('findAccountUser', findAccountUser);
});
 
btnLoanBtn.addEventListener("click",(e)=>{
  e.preventDefault();
  if(!inputLoanAmount.value)return;
  currantAccountFound.movements.push(+(inputLoanAmount.value as unknown) as number);
  movementsDisplayFn(currantAccountFound);
  summaryMovementValues(currantAccountFound);
  inputLoanAmount.value=" ";
});
btnClose.addEventListener("click",(e)=>{
  e.preventDefault();
  if(!inputCloseUsername.value && !inputClosePin.value)return;
  console.log(inputCloseUsername.value ,inputClosePin.value);
  if(inputCloseUsername.value.toLocaleLowerCase() === currantAccountFound.inicialize().toLocaleLowerCase() && +(inputClosePin.value as unknown) as number=== currantAccountFound.pin)
  labelWelcome.textContent='Log in to get started';
  containerApp.style.opacity = '0';
  inputCloseUsername.value=" "; 
  inputClosePin.value=" ";
});

btnSort.addEventListener("click",(e)=>{
  currantAccountFound.sorted=!currantAccountFound.sorted;
movementsDisplayFn(currantAccountFound);
})


