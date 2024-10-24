'use strict';
var account1 = {
    owner: 'Jonas Schmedtmann',
    // owner: 'JS',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    inicialize: function () {
        var splitName = this.owner
            .split(' ')
            .map(function (i) { return i[0]; })
            .join('');
        console.log(splitName);
        return splitName;
    },
    sorted: true
};
var account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    inicialize: function () {
        var splitName = this.owner
            .split(' ')
            .map(function (i) { return i[0]; })
            .join('');
        console.log(splitName);
        return splitName;
    },
    sorted: true
};
var account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    inicialize: function () {
        var splitName = this.owner
            .split(' ')
            .map(function (i) { return i[0]; })
            .join('');
        console.log(splitName);
        return splitName;
    },
    sorted: true
};
var account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    inicialize: function () {
        var splitName = this.owner
            .split(' ')
            .map(function (i) { return i[0]; })
            .join('');
        console.log(splitName);
        return splitName;
    },
    sorted: true
};
var accounts = [account1, account2, account3, account4];
var currantAccountFound;
// Elements
var labelWelcome = document.querySelector('.welcome');
var labelDate = document.querySelector('.date');
var labelBalance = document.querySelector('.balance__value');
var labelSumIn = document.querySelector('.summary__value--in');
var labelSumOut = document.querySelector('.summary__value--out');
var labelSumInterest = document.querySelector('.summary__value--interest');
var labelTimer = document.querySelector('.timer');
var containerApp = document.querySelector('.app');
var helperIntroBoxTXT = document.querySelector(".intro-box");
var containerMovements = document.querySelector('.movements');
var btnLogin = document.querySelector('.login__btn');
var btnTransfer = document.querySelector('.form__btn--transfer');
var btnLoan = document.querySelector('.form__btn--loan');
var btnClose = document.querySelector('.form__btn--close');
var btnSort = document.querySelector('.btn--sort');
var btnLoanBtn = document.querySelector(".form__btn--loan");
var inputLoginUsername = document.querySelector('.login__input--user');
var inputLoginPin = document.querySelector('.login__input--pin');
var inputTransferTo = document.querySelector('.form__input--to');
var inputTransferAmount = document.querySelector('.form__input--amount');
var inputLoanAmount = document.querySelector('.form__input--loan-amount');
var inputCloseUsername = document.querySelector('.form__input--user');
var inputClosePin = document.querySelector('.form__input--pin');
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
var currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);
console.log('====================================');
console.log(currencies);
console.log('====================================');
var movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/////////////////////////////////////////////////
//
// display functions
var balanceTotal = 0;
var countdownTimer;
// Function to move child (intro-box) above the parent (app) when opacity is 0
function moveIntroBox(parentElement, childElement) {
    if (parentElement.style.opacity === "0") {
        // Move child element above parent and center it on the page
        childElement.style.position = "absolute";
        childElement.style.backgroundColor = "green";
        childElement.style.top = "50rem";
        childElement.style.left = "50rem";
        childElement.style.zIndex = "999"; // Ensures it appears above other elements
        childElement.style.display = "block"; // Show the child even when parent is hidden
    }
    else if (parentElement.style.opacity === "1") {
        // Reset helper child to original position inside the parent
        childElement.style.display = "none";
    }
}
var displayBalance = function (moneyIn, moneyOut) {
    balanceTotal = moneyOut + moneyIn;
    console.log('total', moneyOut + moneyIn);
    return moneyOut + moneyIn;
};
var summaryMovementValues = function (accountInfo) {
    var movements = accountInfo.movements;
    console.log(labelBalance.textContent);
    var moneyInCount = 0;
    var moneyOutCount = 0;
    movements.forEach(function (i) {
        if (i < 0) {
            moneyOutCount = moneyOutCount + i;
        }
        else {
            moneyInCount = moneyInCount + i;
        }
        labelSumIn.textContent = "".concat(moneyInCount, "\u20AC");
        labelSumOut.textContent = "".concat(+moneyOutCount, "\u20AC");
        labelSumInterest.textContent = "".concat(accountInfo.interestRate, "\u20AC");
        //  console.log("moneyInCount",moneyInCount,"moneyOutCount",moneyOutCount);
    });
    console.log('displayBalance', displayBalance(moneyInCount, moneyOutCount));
    labelBalance.textContent = "".concat(displayBalance(moneyInCount, moneyOutCount), "\u20AC");
};
// date fn
function parseDate(dateString) {
    var _a = dateString.split("/").map(Number), day = _a[0], month = _a[1], year = _a[2];
    // Adjust month value since JavaScript Date object uses zero-based indexing for months
    var adjustedMonth = month - 1;
    // Create a new Date object using the provided day, month, and year values
    var parsedDate = new Date(year, adjustedMonth, day);
    // Check if the parsed date is valid
    var isValidDate = !isNaN(parsedDate.getTime());
    return isValidDate ? parsedDate : null;
}
var movementsDisplayFn = function (accountInfo) {
    document.querySelector('.movements').textContent = ' ';
    var newMovementsArr = accountInfo.movements;
    var dateStr = "3/7/2023";
    var parsedDate = parseDate(dateStr);
    var formattedDate = parsedDate.toLocaleDateString("en-GB");
    if (parsedDate) {
        console.log(formattedDate); // Output: 05/07/2023
    }
    else {
        console.log("Invalid date format.");
    }
    if (accountInfo.sorted) {
        newMovementsArr
            .sort(function (a, b) { return a - b; })
            .forEach(function (i) {
            var withdrawalOrDeposit = i > 0 ? 'deposit' : 'withdrawal';
            var htmlWithdrawal = "\n    <div class=\"movements__row\">\n<div class=\"movements__type movements__type--".concat(withdrawalOrDeposit, "\">\n1 ").concat(withdrawalOrDeposit, "\n</div>\n<div class=\"movements__date\">").concat(formattedDate, "</div>\n<div class=\"movements__value\">").concat(i, "\u20AC</div>\n</div>");
            document
                .querySelector('.movements')
                .insertAdjacentHTML('afterbegin', htmlWithdrawal);
        });
    }
    else if (!accountInfo.sorted) {
        newMovementsArr
            .sort(function (a, b) { return a - b; }).reverse()
            .forEach(function (i) {
            var withdrawalOrDeposit = i > 0 ? 'deposit' : 'withdrawal';
            var htmlWithdrawal = "\n    <div class=\"movements__row\">\n<div class=\"movements__type movements__type--".concat(withdrawalOrDeposit, "\">\n1 ").concat(withdrawalOrDeposit, "\n</div>\n<div class=\"movements__date\">").concat(formattedDate, "</div>\n<div class=\"movements__value\">").concat(i, "\u20AC</div>\n</div>");
            document
                .querySelector('.movements')
                .insertAdjacentHTML('afterbegin', htmlWithdrawal);
        });
    }
};
function startLogoutCountdown() {
    var countdownSeconds = 300; // 5 minutes in seconds
    // const formattedTime = `00:${seconds.toString().padStart(2, "0")}`;
    function updateTimer() {
        var minutes = Math.floor(countdownSeconds / 60);
        var seconds = countdownSeconds % 60;
        var formattedTime = "".concat(minutes.toString().padStart(2, "0"), ":").concat(seconds.toString().padStart(2, "0"));
        labelTimer.textContent = formattedTime;
        if (countdownSeconds > 0) {
            countdownSeconds--;
        }
        else {
            clearInterval(countdownTimer);
            // Perform logout actions here
            labelWelcome.textContent = 'Log in to get started';
            containerApp.style.opacity = '0';
            moveIntroBox(containerApp, helperIntroBoxTXT);
            inputCloseUsername.value = " ";
            inputClosePin.value = " ";
            console.log("Logged out due to inactivity.");
        }
    }
    ;
    function resetTimer() {
        clearInterval(countdownTimer);
        countdownSeconds = 300; // Reset countdown to 5 minutes
        updateTimer();
        startTimer();
    }
    ;
    function startTimer() {
        countdownTimer = setInterval(updateTimer, 1000);
    }
    ;
    startTimer();
    // Reset timer on mouse movement or click events
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("click", resetTimer);
}
;
//btn
btnLogin.addEventListener('click', function (e) {
    e.preventDefault();
    // if(!inputLoginUsername.value && !inputLoginPin.value) return;
    if (!inputLoginUsername.value)
        return;
    currantAccountFound = accounts.find(function (i) {
        return i.inicialize().toLocaleLowerCase() ===
            inputLoginUsername.value.toLocaleLowerCase() &&
            i.pin === +inputLoginPin.value;
    });
    labelWelcome.textContent = "Welcome back, ".concat(currantAccountFound.owner.split(' ')[0]);
    movementsDisplayFn(currantAccountFound);
    summaryMovementValues(currantAccountFound);
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    containerApp.style.opacity = '1';
    moveIntroBox(containerApp, helperIntroBoxTXT);
    console.log('====================================');
    console.log(currantAccountFound.movements, currantAccountFound.movements.sort(function (a, b) { return a - b; }));
    console.log('====================================');
    startLogoutCountdown();
});
btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    if (!inputTransferTo.value || !inputTransferAmount.value)
        return;
    var findAccountUser = accounts.find(function (i) {
        return i.inicialize().toLocaleLowerCase() ===
            inputTransferTo.value.toLocaleLowerCase();
    });
    if (findAccountUser.inicialize() === currantAccountFound.inicialize())
        return alert("You can't send money to yourself :-)");
    if (+inputTransferAmount.value > balanceTotal)
        return alert("You don't have enough funds for this transfer");
    currantAccountFound.movements.push(-inputTransferAmount.value);
    findAccountUser.movements.push(+inputTransferAmount.value);
    movementsDisplayFn(currantAccountFound);
    summaryMovementValues(currantAccountFound);
    inputTransferTo.value = '';
    inputTransferAmount.value = '';
    console.log('findAccountUser', findAccountUser);
});
btnLoanBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (!inputLoanAmount.value)
        return;
    currantAccountFound.movements.push(+inputLoanAmount.value);
    movementsDisplayFn(currantAccountFound);
    summaryMovementValues(currantAccountFound);
    inputLoanAmount.value = " ";
});
btnClose.addEventListener("click", function (e) {
    e.preventDefault();
    if (!inputCloseUsername.value && !inputClosePin.value)
        return;
    console.log(inputCloseUsername.value, inputClosePin.value);
    if (inputCloseUsername.value.toLocaleLowerCase() === currantAccountFound.inicialize().toLocaleLowerCase() && +inputClosePin.value === currantAccountFound.pin)
        labelWelcome.textContent = 'Log in to get started';
    containerApp.style.opacity = '0';
    helperIntroBoxTXT.style.opacity = "0";
    inputCloseUsername.value = " ";
    inputClosePin.value = " ";
});
btnSort.addEventListener("click", function (e) {
    currantAccountFound.sorted = !currantAccountFound.sorted;
    movementsDisplayFn(currantAccountFound);
});
moveIntroBox(containerApp, helperIntroBoxTXT);
