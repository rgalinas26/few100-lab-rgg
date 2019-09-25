
import './styles.css';

const billInput = document.getElementById('billInput') as HTMLInputElement; // aliasing gave me .value intelesense for billinput.
const tenPercent = document.getElementById('tenPercent') as HTMLButtonElement;
const fifteenPercent = document.getElementById('fifteenPercent') as HTMLButtonElement;
const twentyPercent = document.getElementById('twentyPercent') as HTMLButtonElement;
const listBillAmount = document.getElementById('listBillAmount');
const listTipPercentage = document.getElementById('listTipPercentage');
const listTipAmount = document.getElementById('listTipAmount');
const listTotal = document.getElementById('listTotal');
const tipMessage = document.getElementById('tipMessage');
const tipPreference = document.getElementById('tipPreference');
const customTipInput = document.getElementById('customTipInput') as HTMLInputElement;
const customTipSpan = document.getElementById('customTipSpan');
const splitInput = document.getElementById('splitInput') as HTMLInputElement;
const totalSplitAmount = document.getElementById('totalSplitAmount');
let tipPercent = .20;
let customTip = 0;

/* Checks local storage for a user-set default tip percentage. If found,
disables the button for the prefered amount.*/
/* #region tipDefault Setting From Local Storage */
if (localStorage.getItem('tipDefault') === null) {
    tipPercent = .20;
    listTipPercentage.innerText = 'Tip Percentage: 20%';
} else if (localStorage.getItem('tipDefault') === '10') {
    tipPercent = .10;
    tipMessage.innerText = 'Tip Percentage set to 10% (your saved tip preference)';
    tenPercent.disabled = true;
    fifteenPercent.disabled = false;
    twentyPercent.disabled = false;
    listTipPercentage.innerText = 'Tip Percentage: 10%';
} else if (localStorage.getItem('tipDefault') === '15') {
    tipPercent = .15;
    tipMessage.innerText = 'Tip Percentage set to 15% (your saved tip preference)';
    tenPercent.disabled = false;
    fifteenPercent.disabled = true;
    twentyPercent.disabled = false;
    listTipPercentage.innerText = 'Tip Percentage: 15%';
} else {
    tipPercent = .20;
    tipMessage.innerText = 'Tip Percentage set to 20% (your saved tip preference)';
    tenPercent.disabled = false;
    fifteenPercent.disabled = false;
    twentyPercent.disabled = true;
    listTipPercentage.innerText = 'Tip Percentage: 20%';
}
/* #endregion */

// listening to keyup on bill amount input and calls calculate function
billInput.addEventListener('keyup', function () {
    listBillAmount.innerText = `Bill Cost Before Tip: $${billInput.value}`;
    if (customTipInput.value === '') {
        calculate();
    } else {
        customTipCalculate();
    }
});
// anon func to store user tip preference in LocalStorage
tipPreference.addEventListener('click', () => {
    if (tenPercent.disabled === true) {
        localStorage.setItem('tipDefault', '10');
    } else if (fifteenPercent.disabled === true) {
        localStorage.setItem('tipDefault', '15');
    } else {
        localStorage.setItem('tipDefault', '20');
    }
});
// listening for a custom tip amount input
customTipInput.addEventListener('keyup', customTipCalculate);
/* called when a user enters a custom tip amount. Should either create a grand total
 with the custom tip amount or show split the bill + custom tip amount by n people depending
 on user input. */
customTipSpan.addEventListener('click', () => {
    customTipInput.hidden = false;
});
// anon func to change tip percentage if user clicks button and calls calculate to update values accordingly
tenPercent.addEventListener('click', () => {
    listTipAmount.hidden = false;
    customTipInput.hidden = true;
    tipPercent = .10;
    calculate();
    tenPercent.disabled = true;
    fifteenPercent.disabled = false;
    twentyPercent.disabled = false;
    tipMessage.innerText = 'You are now tipping 10%.';
    listTipPercentage.innerText = 'Tip Percentage: 10%';
});
fifteenPercent.addEventListener('click', () => {
    listTipAmount.hidden = false;
    customTipInput.hidden = true;
    tipPercent = .15;
    calculate();
    tenPercent.disabled = false;
    fifteenPercent.disabled = true;
    twentyPercent.disabled = false;
    tipMessage.innerText = 'You are now tipping 15%.';
    listTipPercentage.innerText = 'Tip Percentage: 15%';
});
twentyPercent.addEventListener('click', () => {
    listTipAmount.hidden = false;
    customTipInput.hidden = true;
    tipPercent = .20;
    calculate();
    tenPercent.disabled = false;
    fifteenPercent.disabled = false;
    twentyPercent.disabled = true;
    tipMessage.innerText = 'You are now tipping 20%.';
    listTipPercentage.innerText = 'Tip Percentage: 20%';
});
/* listening to split input box and calls calculate or custom calculate depending on w/not
user split the bill */
splitInput.addEventListener('keyup', () => {
    if (customTipInput.value === '') {
        calculate();
    } else {
        customTipCalculate();
    }
});

// function that calculates tip amount, displays bill amount, and calculates grand total.
function calculate() {
    if (billInput.valueAsNumber < 0) {
        billInput.classList.add('error');
        listTotal.innerText = 'Enter a non-negative number.';
    } else if (billInput.valueAsNumber === 0 || billInput.value === '') {
        listTipAmount.innerText = `Amount of tip : $0.00`;
        listBillAmount.innerText = `Bill Cost Before Tip: $0.00`;
        listTotal.innerText = `Cost of the Bill Including Tip: $0.00`;
        billInput.classList.remove('error');
    } else if (splitInput.valueAsNumber === 0) {
        splitInput.classList.add('error');
    } else {
        const tip = (Math.round((billInput.valueAsNumber * tipPercent)).toFixed(2));
        const total = (parseInt(tip) + billInput.valueAsNumber).toFixed(2);
        listTipAmount.innerText = `Amount of tip : $${tip}`;
        listBillAmount.innerText = `Bill Cost Before Tip: $${billInput.value}`;
        listTotal.innerText = `Cost of the Bill Including Tip: $${total}`;
        billInput.classList.remove('error');
        if (splitInput.value !== '') {
            const split = (parseInt(total) / splitInput.valueAsNumber).toFixed(2);
            totalSplitAmount.hidden = false;
            totalSplitAmount.innerText = `Each Person Owes: $${split}`;
        }
    }
}
function customTipCalculate() {
    if (splitInput.value === '') {
        customTip = customTipInput.valueAsNumber;
        listTipAmount.hidden = true;
        listTipPercentage.innerText = `Custom Tip: $${customTip}`;
        const customTipGrandTotal = billInput.valueAsNumber + customTip;
        listTotal.innerText = `Cost of Bill Including Tip: $${customTipGrandTotal}`;
    } else {
        customTip = customTipInput.valueAsNumber;
        listTipAmount.hidden = true;
        listTipPercentage.innerText = `Custom Tip: $${customTip}`;
        const customTipGrandTotal = ((billInput.valueAsNumber + customTip) / splitInput.valueAsNumber)
            .toFixed(2);
        listTotal.innerText = `Cost For Each Person: $${customTipGrandTotal}`;
    }
}
